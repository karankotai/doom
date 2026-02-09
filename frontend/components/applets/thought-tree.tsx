"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---

export interface ThoughtTreeChoice {
  id: string;
  text: string;
}

export interface ThoughtTreeNode {
  id: string;
  question: string;
  leftChoice: ThoughtTreeChoice;
  rightChoice: ThoughtTreeChoice;
  correctChoiceId: string;
}

export interface ThoughtTreeContent {
  nodes: ThoughtTreeNode[];
  finalAnswer: string;
}

interface ThoughtTreeProps {
  question: string;
  hint?: string;
  nodes: ThoughtTreeNode[];
  finalAnswer: string;
  onComplete?: (success: boolean) => void;
}

// --- Component ---

export function ThoughtTree({
  question,
  hint,
  nodes,
  finalAnswer,
  onComplete,
}: ThoughtTreeProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [currentDepth, setCurrentDepth] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const allCorrect =
    isComplete &&
    nodes.every((node) => selections[node.id] === node.correctChoiceId);

  // Auto-scroll to the latest level
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [currentDepth, showResult]);

  const handleSelect = useCallback(
    (nodeId: string, choiceId: string) => {
      if (isComplete || selections[nodeId]) return;

      const newSelections = { ...selections, [nodeId]: choiceId };
      setSelections(newSelections);

      if (currentDepth < nodes.length - 1) {
        setTimeout(() => setCurrentDepth((d) => d + 1), 500);
      } else {
        const correct = nodes.every(
          (node) => newSelections[node.id] === node.correctChoiceId
        );
        setTimeout(() => {
          setShowResult(true);
          setIsComplete(true);
          setFeedback(correct ? "correct" : "incorrect");
          if (correct) onComplete?.(true);
        }, 600);
      }
    },
    [selections, currentDepth, nodes, isComplete, onComplete]
  );

  const resetPuzzle = useCallback(() => {
    setSelections({});
    setCurrentDepth(0);
    setIsComplete(false);
    setShowResult(false);
    setFeedback(null);
    setShowHint(false);
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl sm:text-2xl">{question}</CardTitle>
        {hint && showHint && (
          <p className="text-sm text-muted-foreground mt-2 animate-pop">
            {hint}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Feedback banner */}
        {feedback && (
          <div
            className={cn(
              "text-center py-2 px-4 rounded-xl font-bold text-white animate-pop",
              feedback === "correct" ? "bg-primary" : "bg-destructive"
            )}
          >
            {feedback === "correct"
              ? "You found the answer!"
              : "Wrong path! Try a different route."}
          </div>
        )}

        {/* Depth progress */}
        <div className="flex items-center justify-center gap-1.5">
          {nodes.map((_, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 border-2",
                  i < currentDepth
                    ? "bg-primary border-primary text-white"
                    : i === currentDepth && !isComplete
                    ? "bg-primary/10 border-primary text-primary"
                    : isComplete && nodes[i] && selections[nodes[i].id] === nodes[i].correctChoiceId
                    ? "bg-primary border-primary text-white"
                    : isComplete
                    ? "bg-destructive/20 border-destructive text-destructive"
                    : "bg-muted border-border text-muted-foreground"
                )}
                style={
                  i === currentDepth && !isComplete
                    ? { animation: "pulse 2s ease-in-out infinite" }
                    : undefined
                }
              >
                {i < currentDepth ? "\u2713" : i + 1}
              </div>
              {i < nodes.length - 1 && (
                <div
                  className={cn(
                    "w-4 h-0.5 rounded-full transition-all duration-500",
                    i < currentDepth ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Tree visualization */}
        <div className="relative flex flex-col items-center overflow-y-auto max-h-[460px] pb-4">
          {/* Root node */}
          <div
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center text-2xl border-2 transition-all duration-500",
              !isComplete
                ? "border-primary/50 bg-primary/5 shadow-glow-sm"
                : allCorrect
                ? "border-primary bg-primary/10 shadow-glow-md"
                : "border-destructive/50 bg-destructive/5"
            )}
            style={
              !isComplete
                ? { animation: "glow-pulse 3s ease-in-out infinite" }
                : undefined
            }
          >
            {"\u{1F9E0}"}
          </div>

          {/* Tree levels */}
          {nodes.map((node, depth) => {
            if (depth > currentDepth) return null;
            const selected = selections[node.id];
            const isActive = depth === currentDepth && !isComplete;
            const isLeftSelected = selected === node.leftChoice.id;

            return (
              <div
                key={node.id}
                className={cn(
                  "flex flex-col items-center w-full",
                  depth === currentDepth ? "animate-pop" : ""
                )}
              >
                {/* Trunk connector */}
                <div
                  className="w-0.5 h-5 transition-all duration-500"
                  style={{
                    background: `linear-gradient(to bottom, ${
                      isComplete && !allCorrect
                        ? "rgba(255,75,75,0.4)"
                        : "rgba(108,99,255,0.5)"
                    }, ${
                      isComplete && !allCorrect
                        ? "rgba(255,75,75,0.15)"
                        : "rgba(108,99,255,0.15)"
                    })`,
                  }}
                />

                {/* Question node */}
                <div
                  className={cn(
                    "px-4 py-2.5 rounded-2xl text-center text-sm font-semibold max-w-[300px] transition-all duration-300 border",
                    isActive
                      ? "bg-primary/10 border-primary/30 text-foreground shadow-glow-sm"
                      : "bg-muted/60 border-border/50 text-muted-foreground"
                  )}
                >
                  <span className="block text-[10px] uppercase tracking-widest text-muted-foreground/70 mb-0.5">
                    Depth {depth + 1}
                  </span>
                  {node.question}
                </div>

                {/* Branch SVG */}
                <svg
                  className="w-[280px] h-[40px] mt-1 flex-shrink-0"
                  viewBox="0 0 280 40"
                  fill="none"
                >
                  {/* Left branch */}
                  <path
                    d="M140 0 Q140 20 55 38"
                    stroke={
                      !selected
                        ? "#D6D2E4"
                        : isLeftSelected
                        ? "#6C63FF"
                        : "#EDEAF5"
                    }
                    strokeWidth={
                      !selected ? 1.5 : isLeftSelected ? 2.5 : 1
                    }
                    strokeLinecap="round"
                    style={{
                      opacity: !selected ? 0.6 : isLeftSelected ? 1 : 0.2,
                      transition: "all 0.4s ease",
                    }}
                  />
                  {/* Right branch */}
                  <path
                    d="M140 0 Q140 20 225 38"
                    stroke={
                      !selected
                        ? "#D6D2E4"
                        : !isLeftSelected
                        ? "#6C63FF"
                        : "#EDEAF5"
                    }
                    strokeWidth={
                      !selected ? 1.5 : !isLeftSelected ? 2.5 : 1
                    }
                    strokeLinecap="round"
                    style={{
                      opacity: !selected ? 0.6 : !isLeftSelected ? 1 : 0.2,
                      transition: "all 0.4s ease",
                    }}
                  />
                  {/* Junction dots */}
                  <circle
                    cx="55"
                    cy="38"
                    r="3.5"
                    fill={
                      !selected
                        ? "#D6D2E4"
                        : isLeftSelected
                        ? "#6C63FF"
                        : "#EDEAF5"
                    }
                    style={{
                      opacity: !selected ? 0.5 : isLeftSelected ? 1 : 0.2,
                      transition: "all 0.4s ease",
                    }}
                  />
                  <circle
                    cx="225"
                    cy="38"
                    r="3.5"
                    fill={
                      !selected
                        ? "#D6D2E4"
                        : !isLeftSelected
                        ? "#6C63FF"
                        : "#EDEAF5"
                    }
                    style={{
                      opacity: !selected ? 0.5 : !isLeftSelected ? 1 : 0.2,
                      transition: "all 0.4s ease",
                    }}
                  />
                </svg>

                {/* Choice buttons */}
                <div className="flex gap-3 w-full max-w-[320px] px-2">
                  {/* Left choice */}
                  <button
                    disabled={!!selected || isComplete}
                    onClick={() => handleSelect(node.id, node.leftChoice.id)}
                    className={cn(
                      "flex-1 px-3 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border-2 leading-tight",
                      !selected
                        ? "bg-card border-border hover:border-primary/60 hover:bg-primary/5 hover:shadow-glow-sm cursor-pointer active:scale-95"
                        : isLeftSelected
                        ? "bg-primary/10 border-primary text-primary shadow-glow-sm"
                        : "bg-muted/20 border-transparent text-muted-foreground/30 scale-90 opacity-50"
                    )}
                  >
                    {node.leftChoice.text}
                  </button>
                  {/* Right choice */}
                  <button
                    disabled={!!selected || isComplete}
                    onClick={() => handleSelect(node.id, node.rightChoice.id)}
                    className={cn(
                      "flex-1 px-3 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 border-2 leading-tight",
                      !selected
                        ? "bg-card border-border hover:border-primary/60 hover:bg-primary/5 hover:shadow-glow-sm cursor-pointer active:scale-95"
                        : !isLeftSelected
                        ? "bg-primary/10 border-primary text-primary shadow-glow-sm"
                        : "bg-muted/20 border-transparent text-muted-foreground/30 scale-90 opacity-50"
                    )}
                  >
                    {node.rightChoice.text}
                  </button>
                </div>
              </div>
            );
          })}

          {/* Result node */}
          {showResult && (
            <div className="flex flex-col items-center animate-pop">
              {/* Connector to result */}
              <div
                className="w-0.5 h-6"
                style={{
                  background: allCorrect
                    ? "linear-gradient(to bottom, rgba(108,99,255,0.5), rgba(108,99,255,0.2))"
                    : "linear-gradient(to bottom, rgba(255,75,75,0.5), rgba(255,75,75,0.2))",
                }}
              />

              {/* Result orb */}
              <div
                className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center text-4xl border-2",
                  allCorrect
                    ? "bg-primary/10 border-primary shadow-glow-lg"
                    : "bg-destructive/10 border-destructive"
                )}
                style={
                  allCorrect
                    ? { animation: "glow-pulse 2s ease-in-out infinite" }
                    : undefined
                }
              >
                {allCorrect ? "\u2B50" : "\u{1F480}"}
              </div>

              {/* Result text */}
              <div
                className={cn(
                  "mt-3 mx-4 px-4 py-3 rounded-2xl text-center text-sm max-w-[320px] border",
                  allCorrect
                    ? "bg-primary/5 border-primary/20 text-foreground"
                    : "bg-destructive/5 border-destructive/20 text-muted-foreground"
                )}
              >
                {allCorrect ? (
                  <>
                    <span className="block font-bold text-primary mb-1">
                      Path Complete!
                    </span>
                    {finalAnswer}
                  </>
                ) : (
                  <>
                    <span className="block font-bold text-destructive mb-1">
                      Dead End!
                    </span>
                    You took a wrong turn. Retrace your thoughts and try a
                    different path.
                  </>
                )}
              </div>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={bottomRef} />
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center pt-2">
          {!isComplete && hint && !showHint && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHint(true)}
            >
              Show hint
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={resetPuzzle}>
            Start over
          </Button>
          {isComplete && allCorrect && (
            <Button size="sm" onClick={() => onComplete?.(true)}>
              Continue
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

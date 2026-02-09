"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---

export interface Party {
  name: string;
  emoji: string;
  /** Production capacity for each good: { "Wheat": 100, "Cars": 20 } */
  production: Record<string, number>;
}

export interface AdvantageStep {
  /** The question for this step */
  instruction: string;
  /** Which good this question is about */
  good: string;
  /** "absolute" = who produces more? "opportunity" = what's the opp. cost? "comparative" = who has lower opp. cost? */
  questionType: "absolute" | "opportunity-cost" | "comparative";
  /**
   * For absolute: correctAnswer is the numeric production value, partyIndex = which party
   * For opportunity-cost: correctAnswer is the numeric opp cost, partyIndex = which party
   * For comparative: correctAnswer is the numeric opp cost of the winner, partyIndex = which party has the advantage
   */
  partyIndex: number;
  correctAnswer: number;
  /** Tolerance for slider (±). Default 0 for whole numbers */
  tolerance?: number;
  /** Optional explanation shown after correct answer */
  explanation?: string;
}

export interface ComparativeAdvantageContent {
  parties: [Party, Party];
  goods: string[];
  steps: AdvantageStep[];
}

interface ComparativeAdvantageProps {
  question: string;
  hint?: string;
  parties: [Party, Party];
  goods: string[];
  steps: AdvantageStep[];
  onComplete?: (success: boolean) => void;
}

// --- Component ---

export function ComparativeAdvantage({
  question,
  hint,
  parties,
  goods,
  steps,
  onComplete,
}: ComparativeAdvantageProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [stepDone, setStepDone] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const sliderTrackRef = useRef<HTMLDivElement>(null);

  const step = steps[stepIndex];

  // Compute slider range from the data for this step
  const sliderRange = useCallback((): { min: number; max: number; stepSize: number } => {
    if (!step) return { min: 0, max: 100, stepSize: 1 };

    if (step.questionType === "absolute") {
      // Range covers both parties' production for this good
      const vals = parties.map((p) => p.production[step.good] ?? 0);
      const maxV = Math.max(...vals);
      return { min: 0, max: Math.ceil(maxV * 1.3 / 10) * 10, stepSize: 1 };
    }

    if (step.questionType === "opportunity-cost") {
      // Opp cost range: 0 to something reasonable
      const maxOpp = Math.max(
        ...parties.map((p) => {
          const vals = Object.values(p.production);
          if (vals.length < 2) return 5;
          return Math.max(...vals) / Math.min(...vals.filter((v) => v > 0));
        })
      );
      const cap = Math.ceil(maxOpp * 1.5);
      // Use 0.1 steps for fractional opp costs
      return { min: 0, max: cap, stepSize: 0.1 };
    }

    // comparative — same as opp-cost range
    const maxOpp = Math.max(
      ...parties.map((p) => {
        const vals = Object.values(p.production);
        if (vals.length < 2) return 5;
        return Math.max(...vals) / Math.min(...vals.filter((v) => v > 0));
      })
    );
    return { min: 0, max: Math.ceil(maxOpp * 1.5), stepSize: 0.1 };
  }, [step, parties]);

  const { min: sliderMin, max: sliderMax, stepSize } = sliderRange();

  // Reset slider when step changes
  useEffect(() => {
    setSliderValue(Math.round((sliderMin + sliderMax) / 2 / stepSize) * stepSize);
  }, [stepIndex, sliderMin, sliderMax, stepSize]);

  // --- Slider interaction ---

  const getValueFromPosition = useCallback(
    (clientX: number): number => {
      const track = sliderTrackRef.current;
      if (!track) return sliderMin;
      const rect = track.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const raw = sliderMin + ratio * (sliderMax - sliderMin);
      return Math.round(raw / stepSize) * stepSize;
    },
    [sliderMin, sliderMax, stepSize]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (stepDone || isComplete) return;
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setSliderValue(getValueFromPosition(e.clientX));
    },
    [stepDone, isComplete, getValueFromPosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setSliderValue(getValueFromPosition(e.clientX));
    },
    [isDragging, getValueFromPosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // --- Check answer ---

  const checkAnswer = useCallback(() => {
    if (!step || stepDone) return;
    const tolerance = step.tolerance ?? (stepSize < 1 ? 0.15 : 0.5);
    if (Math.abs(sliderValue - step.correctAnswer) <= tolerance) {
      setFeedback("correct");
      setStepDone(true);
      setShowExplanation(true);
    } else {
      setFeedback("incorrect");
      setTimeout(() => setFeedback(null), 1200);
    }
  }, [step, stepDone, sliderValue, stepSize]);

  const advance = useCallback(() => {
    setFeedback(null);
    setStepDone(false);
    setShowExplanation(false);
    setShowHint(false);
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setIsComplete(true);
      onComplete?.(true);
    }
  }, [stepIndex, steps.length, onComplete]);

  const reset = () => {
    setStepIndex(0);
    setSliderValue(0);
    setFeedback(null);
    setStepDone(false);
    setIsComplete(false);
    setShowHint(false);
    setShowExplanation(false);
  };

  // Slider fill percentage
  const fillPct = ((sliderValue - sliderMin) / (sliderMax - sliderMin)) * 100;

  // Format display value
  const displayVal = stepSize < 1
    ? sliderValue.toFixed(1)
    : Math.round(sliderValue).toString();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-xl sm:text-2xl">{question}</CardTitle>
        {hint && showHint && (
          <p className="text-sm text-muted-foreground mt-2 animate-pop">{hint}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Step instruction */}
        {step && (
          <p className="text-sm font-semibold text-foreground text-center leading-relaxed">
            {step.instruction}
          </p>
        )}

        {/* Feedback */}
        {feedback && (
          <div className={cn(
            "text-center py-2 px-4 rounded-xl font-bold text-white animate-pop",
            feedback === "correct" ? "bg-primary" : "bg-destructive",
          )}>
            {feedback === "correct" ? "Correct!" : "Not quite \u2014 try again!"}
          </div>
        )}

        {/* Production table */}
        <div className="rounded-2xl border-2 border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-3 text-left font-bold text-muted-foreground">
                  Good
                </th>
                {parties.map((p, i) => (
                  <th
                    key={i}
                    className={cn(
                      "px-4 py-3 text-center font-bold transition-colors",
                      step && step.partyIndex === i && !stepDone
                        ? "text-accent"
                        : "text-foreground"
                    )}
                  >
                    <span className="text-lg mr-1">{p.emoji}</span>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {goods.map((good) => (
                <tr key={good} className="border-t border-border">
                  <td className={cn(
                    "px-4 py-3 font-semibold",
                    step?.good === good ? "text-foreground" : "text-muted-foreground",
                  )}>
                    {good}
                    {step?.good === good && (
                      <span className="ml-1.5 text-accent">◀</span>
                    )}
                  </td>
                  {parties.map((p, i) => (
                    <td
                      key={i}
                      className={cn(
                        "px-4 py-3 text-center font-mono font-bold text-lg",
                        step?.good === good && step.partyIndex === i && !stepDone
                          ? "text-accent"
                          : "text-foreground",
                      )}
                    >
                      {p.production[good] ?? 0}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Party cards + slider visual */}
        <div className="flex items-stretch gap-4">
          {/* Party A card */}
          <div className={cn(
            "flex-1 rounded-2xl border-2 p-4 text-center transition-all",
            step?.partyIndex === 0 && !stepDone
              ? "border-accent bg-accent/5 shadow-cosmos-accent"
              : "border-border bg-card",
          )}>
            <div className="text-3xl mb-1">{parties[0].emoji}</div>
            <div className="font-bold text-sm">{parties[0].name}</div>
          </div>

          {/* Slider area */}
          <div className="flex-[2] flex flex-col items-center justify-center gap-2 min-w-0">
            {/* Current value display */}
            <div className={cn(
              "text-3xl font-bold tabular-nums transition-colors",
              stepDone ? "text-primary" : "text-accent",
            )}>
              {displayVal}
            </div>

            {/* Slider track */}
            <div
              ref={sliderTrackRef}
              className={cn(
                "relative w-full h-10 flex items-center",
                !stepDone && !isComplete && "cursor-pointer",
              )}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
            >
              {/* Track background */}
              <div className="absolute left-0 right-0 h-2.5 rounded-full bg-muted" />

              {/* Fill */}
              <div
                className={cn(
                  "absolute left-0 h-2.5 rounded-full transition-colors",
                  stepDone ? "bg-primary" : "bg-accent",
                )}
                style={{ width: `${fillPct}%` }}
              />

              {/* Correct answer marker (shown after answer) */}
              {stepDone && step && (
                <div
                  className="absolute w-1 h-5 rounded-full bg-primary"
                  style={{
                    left: `${((step.correctAnswer - sliderMin) / (sliderMax - sliderMin)) * 100}%`,
                    transform: "translateX(-50%)",
                  }}
                />
              )}

              {/* Thumb */}
              <div
                className={cn(
                  "absolute w-7 h-7 rounded-full border-4 transition-all duration-100 shadow-md",
                  stepDone
                    ? "bg-primary border-primary"
                    : isDragging
                    ? "bg-accent border-accent scale-110"
                    : "bg-white border-accent",
                )}
                style={{
                  left: `${fillPct}%`,
                  transform: "translateX(-50%)",
                }}
              />
            </div>

            {/* Min / Max labels */}
            <div className="flex justify-between w-full text-xs text-muted-foreground font-semibold tabular-nums">
              <span>{sliderMin}</span>
              <span>{sliderMax}</span>
            </div>
          </div>

          {/* Party B card */}
          <div className={cn(
            "flex-1 rounded-2xl border-2 p-4 text-center transition-all",
            step?.partyIndex === 1 && !stepDone
              ? "border-accent bg-accent/5 shadow-cosmos-accent"
              : "border-border bg-card",
          )}>
            <div className="text-3xl mb-1">{parties[1].emoji}</div>
            <div className="font-bold text-sm">{parties[1].name}</div>
          </div>
        </div>

        {/* Explanation (shown after correct) */}
        {showExplanation && step?.explanation && (
          <div className="text-center text-sm text-muted-foreground bg-primary/5 border border-primary/20 rounded-xl px-4 py-3 animate-pop">
            {step.explanation}
          </div>
        )}

        {/* Step dots */}
        {steps.length > 1 && (
          <div className="flex items-center justify-center gap-1.5">
            {steps.map((_, i) => (
              <div key={i} className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                i < stepIndex ? "bg-primary"
                  : i === stepIndex ? "bg-accent scale-125"
                  : "bg-muted",
              )} />
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-3 justify-center pt-2">
          {!isComplete && hint && !showHint && (
            <Button variant="outline" size="sm" onClick={() => setShowHint(true)}>
              Show hint
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={reset}>
            Start over
          </Button>
          {!stepDone && !isComplete && step && (
            <Button size="sm" onClick={checkAnswer}>
              Check
            </Button>
          )}
          {stepDone && !isComplete && (
            <Button size="sm" onClick={advance}>
              Continue
            </Button>
          )}
          {isComplete && (
            <Button size="sm" onClick={() => onComplete?.(true)}>
              Continue
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Note: Puzzle content is now stored in the database.
// Use the API to fetch puzzles: GET /applets?type=comparative-advantage

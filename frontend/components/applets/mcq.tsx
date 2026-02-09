"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---

export interface McqOption {
  id: string;
  text: string;
}

export interface McqContent {
  options: McqOption[];
  correctOptionId: string;
}

interface McqProps {
  question: string;
  hint?: string;
  options: McqOption[];
  correctOptionId: string;
  onComplete?: (success: boolean) => void;
}

// --- Component ---

export function Mcq({
  question,
  hint,
  options,
  correctOptionId,
  onComplete,
}: McqProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleOptionClick = useCallback(
    (optionId: string) => {
      if (isComplete) return;

      setSelectedOptionId(optionId);

      const isCorrect = optionId === correctOptionId;

      if (isCorrect) {
        setFeedback("correct");
        setIsComplete(true);
        onComplete?.(true);
      } else {
        setFeedback("incorrect");
        // Clear incorrect feedback after a moment
        setTimeout(() => {
          setFeedback(null);
          setSelectedOptionId(null);
        }, 1000);
      }
    },
    [isComplete, correctOptionId, onComplete]
  );

  const resetPuzzle = useCallback(() => {
    setSelectedOptionId(null);
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
  }, []);

  // Get option letter (A, B, C, D)
  const getOptionLetter = (index: number): string => {
    return String.fromCharCode(65 + index); // 65 is 'A'
  };

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

      <CardContent className="space-y-4">
        {/* Feedback banner */}
        {feedback && (
          <div
            className={cn(
              "text-center py-2 px-4 rounded-xl font-bold text-white animate-pop",
              feedback === "correct" ? "bg-primary" : "bg-destructive"
            )}
          >
            {feedback === "correct"
              ? "Correct! Well done!"
              : "Not quite - try again!"}
          </div>
        )}

        {/* Options */}
        <div className="grid gap-3">
          {options.map((option, index) => {
            const isSelected = selectedOptionId === option.id;
            const isCorrectOption = option.id === correctOptionId;
            const showAsCorrect = isComplete && isCorrectOption;
            const showAsIncorrect = isSelected && feedback === "incorrect";

            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                disabled={isComplete}
                className={cn(
                  "flex items-center gap-4 w-full p-4 rounded-2xl border-2 text-left transition-all duration-200",
                  "hover:border-accent hover:bg-accent/5",
                  "active:translate-y-0.5 active:shadow-none",
                  "disabled:cursor-default disabled:hover:border-border disabled:hover:bg-transparent",
                  // Default state
                  !isSelected && !showAsCorrect && "border-border bg-card shadow-cosmos",
                  // Selected state
                  isSelected && !feedback && "border-accent bg-accent/10 shadow-cosmos-accent",
                  // Correct state
                  showAsCorrect && "border-primary bg-primary/10 shadow-cosmos-primary",
                  // Incorrect state
                  showAsIncorrect && "border-destructive bg-destructive/10 animate-shake"
                )}
              >
                {/* Option letter badge */}
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-xl font-bold text-lg shrink-0 transition-colors",
                    !isSelected && !showAsCorrect && "bg-muted text-muted-foreground",
                    isSelected && !feedback && "bg-accent text-white",
                    showAsCorrect && "bg-primary text-white",
                    showAsIncorrect && "bg-destructive text-white"
                  )}
                >
                  {getOptionLetter(index)}
                </div>

                {/* Option text */}
                <span
                  className={cn(
                    "font-semibold text-base",
                    showAsCorrect && "text-primary",
                    showAsIncorrect && "text-destructive"
                  )}
                >
                  {option.text}
                </span>

                {/* Correct indicator */}
                {showAsCorrect && (
                  <span className="ml-auto text-2xl animate-pop">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center pt-4">
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

// Note: MCQ content is stored in the database.
// Use the API to fetch puzzles: GET /applets?type=mcq

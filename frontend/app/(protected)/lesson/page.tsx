"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChessPuzzle, SAMPLE_PUZZLES } from "@/components/applets/chess-puzzle";
import { CodeBlocks, SAMPLE_CODE_PUZZLES } from "@/components/applets/code-blocks";
import { SlopeGraph, SAMPLE_SLOPE_PUZZLES } from "@/components/applets/slope-graph";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type LessonPuzzle =
  | { type: "chess"; data: (typeof SAMPLE_PUZZLES)[number] }
  | { type: "code-blocks"; data: (typeof SAMPLE_CODE_PUZZLES)[number] }
  | { type: "slope-graph"; data: (typeof SAMPLE_SLOPE_PUZZLES)[number] };

const ALL_PUZZLES: LessonPuzzle[] = [
  ...SAMPLE_PUZZLES.map((p) => ({ type: "chess" as const, data: p })),
  ...SAMPLE_CODE_PUZZLES.map((p) => ({ type: "code-blocks" as const, data: p })),
  ...SAMPLE_SLOPE_PUZZLES.map((p) => ({ type: "slope-graph" as const, data: p })),
];

export default function LessonPage() {
  const router = useRouter();
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [completedPuzzles, setCompletedPuzzles] = useState<number[]>([]);
  const [xpEarned, setXpEarned] = useState(0);

  const currentPuzzle = ALL_PUZZLES[currentPuzzleIndex];
  const isLessonComplete = completedPuzzles.length === ALL_PUZZLES.length;

  const handlePuzzleComplete = (success: boolean) => {
    if (success && !completedPuzzles.includes(currentPuzzleIndex)) {
      setCompletedPuzzles([...completedPuzzles, currentPuzzleIndex]);
      setXpEarned((prev) => prev + 10); // 10 XP per puzzle
    }
  };

  const handleNextPuzzle = () => {
    if (currentPuzzleIndex < ALL_PUZZLES.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    }
  };

  const handlePrevPuzzle = () => {
    if (currentPuzzleIndex > 0) {
      setCurrentPuzzleIndex(currentPuzzleIndex - 1);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
          ← Back
        </Button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-warning/10 text-warning">
            <span className="text-lg">⚡</span>
            <span className="font-bold text-sm">+{xpEarned} XP</span>
          </div>
          <span className="text-sm font-semibold text-muted-foreground">
            {completedPuzzles.length} / {ALL_PUZZLES.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{
            width: `${(completedPuzzles.length / ALL_PUZZLES.length) * 100}%`,
          }}
        />
      </div>

      {/* Lesson complete screen */}
      {isLessonComplete ? (
        <Card className="text-center py-12">
          <CardContent className="space-y-6">
            <div className="text-6xl animate-pop">🎉</div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Lesson Complete!</h2>
              <p className="text-muted-foreground mt-2">
                You&apos;ve mastered all the puzzles
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-warning">
              <span>⚡</span>
              <span>+{xpEarned} XP earned!</span>
            </div>
            <Button size="lg" onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      ) : currentPuzzle ? (
        <>
          {/* Puzzle type indicator */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">
              {currentPuzzle.type === "chess" ? "♟️" : currentPuzzle.type === "slope-graph" ? "📐" : "🧩"}
            </span>
            <h1 className="text-lg font-bold text-foreground">
              {currentPuzzle.type === "chess" ? "Chess Tactics" : currentPuzzle.type === "slope-graph" ? "Slope Graph" : "Code Blocks"}
            </h1>
          </div>

          {/* Puzzle */}
          {currentPuzzle.type === "chess" ? (
            <ChessPuzzle
              key={currentPuzzle.data.id}
              question={currentPuzzle.data.question}
              hint={currentPuzzle.data.hint}
              initialPosition={currentPuzzle.data.initialPosition}
              correctMove={currentPuzzle.data.correctMove}
              onComplete={handlePuzzleComplete}
            />
          ) : currentPuzzle.type === "slope-graph" ? (
            <SlopeGraph
              key={currentPuzzle.data.id}
              question={currentPuzzle.data.question}
              hint={currentPuzzle.data.hint}
              startPoint={currentPuzzle.data.startPoint}
              targetPoint={currentPuzzle.data.targetPoint}
              gridSize={currentPuzzle.data.gridSize}
              onComplete={handlePuzzleComplete}
            />
          ) : (
            <CodeBlocks
              key={currentPuzzle.data.id}
              question={currentPuzzle.data.question}
              hint={currentPuzzle.data.hint}
              language={currentPuzzle.data.language}
              lines={currentPuzzle.data.lines}
              answerBlocks={currentPuzzle.data.answerBlocks}
              onComplete={handlePuzzleComplete}
            />
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={handlePrevPuzzle}
              disabled={currentPuzzleIndex === 0}
            >
              ← Previous
            </Button>

            {/* Puzzle indicators */}
            <div className="flex gap-2">
              {ALL_PUZZLES.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    completedPuzzles.includes(index)
                      ? "bg-primary"
                      : index === currentPuzzleIndex
                      ? "bg-accent"
                      : "bg-muted"
                  }`}
                  onClick={() => setCurrentPuzzleIndex(index)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={handleNextPuzzle}
              disabled={currentPuzzleIndex === ALL_PUZZLES.length - 1}
            >
              Next →
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}

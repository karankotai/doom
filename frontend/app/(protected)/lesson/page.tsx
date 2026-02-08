"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import type { Applet, CodeBlocksApplet, SlopeGraphApplet, ChessApplet, McqApplet, FillBlanksApplet, VennDiagramApplet, HighlightTextApplet, ComparativeAdvantageApplet, OrderingApplet, ColorMixingApplet, MapSelectApplet, CategorizationGridApplet, FractionVisualizerApplet } from "@/lib/types/applet";
import { ChessPuzzle } from "@/components/applets/chess-puzzle";
import { CodeBlocks } from "@/components/applets/code-blocks";
import { SlopeGraph } from "@/components/applets/slope-graph";
import { Mcq } from "@/components/applets/mcq";
import { FillBlanks } from "@/components/applets/fill-blanks";
import { VennDiagram } from "@/components/applets/venn-diagram";
import { HighlightText } from "@/components/applets/highlight-text";
import { ComparativeAdvantage } from "@/components/applets/comparative-advantage";
import { Ordering } from "@/components/applets/ordering";
import { ColorMixing } from "@/components/applets/color-mixing";
import { MapSelect } from "@/components/applets/map-select";
import { CategorizationGrid } from "@/components/applets/categorization-grid";
import { FractionVisualizer } from "@/components/applets/fraction-visualizer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LessonPage() {
  const router = useRouter();
  const [applets, setApplets] = useState<Applet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0);
  const [completedPuzzles, setCompletedPuzzles] = useState<number[]>([]);
  const [xpEarned, setXpEarned] = useState(0);

  // Fetch applets on mount
  useEffect(() => {
    async function fetchApplets() {
      try {
        setIsLoading(true);
        const { applets: fetchedApplets } = await api.getRandomApplets(5);
        setApplets(fetchedApplets);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load applets");
      } finally {
        setIsLoading(false);
      }
    }
    fetchApplets();
  }, []);

  const currentPuzzle = applets[currentPuzzleIndex];
  const isLessonComplete = applets.length > 0 && completedPuzzles.length === applets.length;

  const handlePuzzleComplete = (success: boolean) => {
    if (success) {
      // If puzzle is not yet marked complete, mark it and award XP
      if (!completedPuzzles.includes(currentPuzzleIndex)) {
        setCompletedPuzzles([...completedPuzzles, currentPuzzleIndex]);
        setXpEarned((prev) => prev + 10); // 10 XP per puzzle
      } else {
        // Puzzle already complete - this is the Continue button, advance to next
        if (currentPuzzleIndex < applets.length - 1) {
          setCurrentPuzzleIndex(currentPuzzleIndex + 1);
        }
      }
    }
  };

  const handleNextPuzzle = () => {
    if (currentPuzzleIndex < applets.length - 1) {
      setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    }
  };

  const handlePrevPuzzle = () => {
    if (currentPuzzleIndex > 0) {
      setCurrentPuzzleIndex(currentPuzzleIndex - 1);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <div className="text-4xl">😕</div>
            <h2 className="text-xl font-bold text-foreground">Oops!</h2>
            <p className="text-muted-foreground">{error}</p>
            <Button onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Empty state
  if (applets.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <div className="text-4xl">📚</div>
            <h2 className="text-xl font-bold text-foreground">No puzzles available</h2>
            <p className="text-muted-foreground">Check back later for new content!</p>
            <Button onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            {completedPuzzles.length} / {applets.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{
            width: `${(completedPuzzles.length / applets.length) * 100}%`,
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
              {currentPuzzle.type === "chess" ? "♟️" :
               currentPuzzle.type === "slope-graph" ? "📐" :
               currentPuzzle.type === "mcq" ? "❓" :
               currentPuzzle.type === "fill-blanks" ? "📝" :
               currentPuzzle.type === "venn-diagram" ? "⭕" :
               currentPuzzle.type === "highlight-text" ? "🖍️" :
               currentPuzzle.type === "comparative-advantage" ? "⚖️" :
               currentPuzzle.type === "ordering" ? "📊" :
               currentPuzzle.type === "color-mixing" ? "🎨" :
               currentPuzzle.type === "map-select" ? "🗺️" :
               currentPuzzle.type === "categorization-grid" ? "📋" :
               currentPuzzle.type === "fraction-visualizer" ? "🟦" : "🧩"}
            </span>
            <h1 className="text-lg font-bold text-foreground">
              {currentPuzzle.type === "chess" ? "Chess Tactics" :
               currentPuzzle.type === "slope-graph" ? "Slope Graph" :
               currentPuzzle.type === "mcq" ? "Multiple Choice" :
               currentPuzzle.type === "fill-blanks" ? "Fill in the Blanks" :
               currentPuzzle.type === "venn-diagram" ? "Venn Diagram" :
               currentPuzzle.type === "highlight-text" ? "Highlight Text" :
               currentPuzzle.type === "comparative-advantage" ? "Comparative Advantage" :
               currentPuzzle.type === "ordering" ? "Ordering" :
               currentPuzzle.type === "color-mixing" ? "Color Mixing" :
               currentPuzzle.type === "map-select" ? "Map Select" :
               currentPuzzle.type === "categorization-grid" ? "Categorization Grid" :
               currentPuzzle.type === "fraction-visualizer" ? "Fraction Visualizer" : "Code Blocks"}
            </h1>
          </div>

          {/* Puzzle - render based on type */}
          {currentPuzzle.type === "chess" ? (
            <ChessPuzzle
              key={currentPuzzle.id}
              question={currentPuzzle.question}
              hint={currentPuzzle.hint}
              initialPosition={(currentPuzzle as ChessApplet).content.initialPosition}
              correctMove={(currentPuzzle as ChessApplet).content.correctMove}
              onComplete={handlePuzzleComplete}
            />
          ) : currentPuzzle.type === "slope-graph" ? (
            <SlopeGraph
              key={currentPuzzle.id}
              question={currentPuzzle.question}
              hint={currentPuzzle.hint}
              startPoint={(currentPuzzle as SlopeGraphApplet).content.startPoint}
              targetPoint={(currentPuzzle as SlopeGraphApplet).content.targetPoint}
              gridSize={(currentPuzzle as SlopeGraphApplet).content.gridSize}
              onComplete={handlePuzzleComplete}
            />
          ) : currentPuzzle.type === "mcq" ? (
            <Mcq
              key={currentPuzzle.id}
              question={currentPuzzle.question}
              hint={currentPuzzle.hint}
              options={(currentPuzzle as McqApplet).content.options}
              correctOptionId={(currentPuzzle as McqApplet).content.correctOptionId}
              onComplete={handlePuzzleComplete}
            />
          ) : currentPuzzle.type === "fill-blanks" ? (
            <FillBlanks
              key={currentPuzzle.id}
              question={currentPuzzle.question}
              hint={currentPuzzle.hint}
              segments={(currentPuzzle as FillBlanksApplet).content.segments}
              answerBlocks={(currentPuzzle as FillBlanksApplet).content.answerBlocks}
              onComplete={handlePuzzleComplete}
            />
          ) : currentPuzzle.type === "venn-diagram" ? (
            <VennDiagram
              key={currentPuzzle.id}
              question={currentPuzzle.question}
              hint={currentPuzzle.hint}
              labels={(currentPuzzle as VennDiagramApplet).content.labels}
              correctRegions={(currentPuzzle as VennDiagramApplet).content.correctRegions}
              onComplete={handlePuzzleComplete}
            />
          ) : currentPuzzle.type === "highlight-text" ? (
            <HighlightText
              key={currentPuzzle.id}
              question={currentPuzzle.question}
              hint={currentPuzzle.hint}
              text={(currentPuzzle as HighlightTextApplet).content.text}
              categories={(currentPuzzle as HighlightTextApplet).content.categories}
              correctHighlights={(currentPuzzle as HighlightTextApplet).content.correctHighlights}
              onComplete={handlePuzzleComplete}
            />
          ) : currentPuzzle.type === "comparative-advantage" ? (
            <ComparativeAdvantage
              key={currentPuzzle.id}
              question={currentPuzzle.question}
              hint={currentPuzzle.hint}
              parties={(currentPuzzle as ComparativeAdvantageApplet).content.parties}
              goods={(currentPuzzle as ComparativeAdvantageApplet).content.goods}
              steps={(currentPuzzle as ComparativeAdvantageApplet).content.steps}
              onComplete={handlePuzzleComplete}
            />
          ) : currentPuzzle.type === "ordering" ? (
            <Ordering
              key={currentPuzzle.id}
              question={currentPuzzle.question}
              hint={currentPuzzle.hint}
              items={(currentPuzzle as OrderingApplet).content.items}
              correctOrder={(currentPuzzle as OrderingApplet).content.correctOrder}
              direction={(currentPuzzle as OrderingApplet).content.direction}
              onComplete={handlePuzzleComplete}
            />
          ) : currentPuzzle.type === "color-mixing" ? (
            <ColorMixing
              key={currentPuzzle.id}
              question={currentPuzzle.question}
              hint={currentPuzzle.hint}
              targetHex={(currentPuzzle as ColorMixingApplet).content.targetHex}
              targetLabel={(currentPuzzle as ColorMixingApplet).content.targetLabel}
              colorBlocks={(currentPuzzle as ColorMixingApplet).content.colorBlocks}
              correctBlockIds={(currentPuzzle as ColorMixingApplet).content.correctBlockIds}
              mode={(currentPuzzle as ColorMixingApplet).content.mode}
              onComplete={handlePuzzleComplete}
            />
          ) : currentPuzzle.type === "map-select" ? (
            <MapSelect
              key={currentPuzzle.id}
              question={currentPuzzle.question}
              hint={currentPuzzle.hint}
              regions={(currentPuzzle as MapSelectApplet).content.regions}
              correctRegionIds={(currentPuzzle as MapSelectApplet).content.correctRegionIds}
              mapView={(currentPuzzle as MapSelectApplet).content.mapView}
              onComplete={handlePuzzleComplete}
            />
          ) : currentPuzzle.type === "categorization-grid" ? (
            <CategorizationGrid
              key={currentPuzzle.id}
              question={currentPuzzle.question}
              hint={currentPuzzle.hint}
              categories={(currentPuzzle as CategorizationGridApplet).content.categories}
              items={(currentPuzzle as CategorizationGridApplet).content.items}
              correctMapping={(currentPuzzle as CategorizationGridApplet).content.correctMapping}
              layout={(currentPuzzle as CategorizationGridApplet).content.layout}
              matrixAxes={(currentPuzzle as CategorizationGridApplet).content.matrixAxes}
              onComplete={handlePuzzleComplete}
            />
          ) : currentPuzzle.type === "fraction-visualizer" ? (
            <FractionVisualizer
              key={currentPuzzle.id}
              question={currentPuzzle.question}
              hint={currentPuzzle.hint}
              shape={(currentPuzzle as FractionVisualizerApplet).content.shape}
              sections={(currentPuzzle as FractionVisualizerApplet).content.sections}
              targetNumerator={(currentPuzzle as FractionVisualizerApplet).content.targetNumerator}
              targetDenominator={(currentPuzzle as FractionVisualizerApplet).content.targetDenominator}
              viewBox={(currentPuzzle as FractionVisualizerApplet).content.viewBox}
              onComplete={handlePuzzleComplete}
            />
          ) : (
            <CodeBlocks
              key={currentPuzzle.id}
              question={currentPuzzle.question}
              hint={currentPuzzle.hint}
              language={(currentPuzzle as CodeBlocksApplet).content.language}
              lines={(currentPuzzle as CodeBlocksApplet).content.lines}
              answerBlocks={(currentPuzzle as CodeBlocksApplet).content.answerBlocks}
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
              {applets.map((_, index) => (
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
              disabled={currentPuzzleIndex === applets.length - 1}
            >
              Next →
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}

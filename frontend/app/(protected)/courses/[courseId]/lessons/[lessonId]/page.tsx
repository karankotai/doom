"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/context/auth-context";
import type { LessonWithApplets } from "@/lib/types/course";
import type {
  Applet,
  CodeBlocksApplet,
  SlopeGraphApplet,
  ChessApplet,
  McqApplet,
  FillBlanksApplet,
  VennDiagramApplet,
  HighlightTextApplet,
  ComparativeAdvantageApplet,
  OrderingApplet,
  ColorMixingApplet,
  MapSelectApplet,
  CategorizationGridApplet,
  FractionVisualizerApplet,
  ChartReadingApplet,
  MatchPairsApplet,
  InteractiveDiagramApplet,
  ThoughtTreeApplet,
} from "@/lib/types/applet";
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
import { ChartReading } from "@/components/applets/chart-reading";
import { MatchPairs } from "@/components/applets/match-pairs";
import { InteractiveDiagram } from "@/components/applets/interactive-diagram";
import { ThoughtTree } from "@/components/applets/thought-tree";
import { ExplanationReveal } from "@/components/applets/explanation-reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function getAppletEmoji(type: string): string {
  const map: Record<string, string> = {
    chess: "♟️", "slope-graph": "📐", mcq: "❓", "fill-blanks": "📝",
    "venn-diagram": "⭕", "highlight-text": "🖍️", "comparative-advantage": "⚖️",
    ordering: "📊", "color-mixing": "🎨", "map-select": "🗺️",
    "categorization-grid": "📋", "fraction-visualizer": "🟦", "chart-reading": "📊",
    "match-pairs": "🔗", "interactive-diagram": "🔬", "thought-tree": "🌳",
    "code-blocks": "🧩",
  };
  return map[type] ?? "🧩";
}

function renderApplet(
  applet: Applet,
  onComplete: (success: boolean) => void
) {
  const key = applet.id;
  const q = applet.question;
  const h = applet.hint;

  switch (applet.type) {
    case "chess":
      return <ChessPuzzle key={key} question={q} hint={h} initialPosition={(applet as ChessApplet).content.initialPosition} correctMove={(applet as ChessApplet).content.correctMove} correctMoves={(applet as ChessApplet).content.correctMoves} onComplete={onComplete} />;
    case "slope-graph":
      return <SlopeGraph key={key} question={q} hint={h} startPoint={(applet as SlopeGraphApplet).content.startPoint} targetPoint={(applet as SlopeGraphApplet).content.targetPoint} gridSize={(applet as SlopeGraphApplet).content.gridSize} onComplete={onComplete} />;
    case "mcq":
      return <Mcq key={key} question={q} hint={h} options={(applet as McqApplet).content.options} correctOptionId={(applet as McqApplet).content.correctOptionId} onComplete={onComplete} />;
    case "fill-blanks":
      return <FillBlanks key={key} question={q} hint={h} segments={(applet as FillBlanksApplet).content.segments} answerBlocks={(applet as FillBlanksApplet).content.answerBlocks} onComplete={onComplete} />;
    case "venn-diagram":
      return <VennDiagram key={key} question={q} hint={h} labels={(applet as VennDiagramApplet).content.labels} correctRegions={(applet as VennDiagramApplet).content.correctRegions} onComplete={onComplete} />;
    case "highlight-text":
      return <HighlightText key={key} question={q} hint={h} text={(applet as HighlightTextApplet).content.text} categories={(applet as HighlightTextApplet).content.categories} correctHighlights={(applet as HighlightTextApplet).content.correctHighlights} onComplete={onComplete} />;
    case "comparative-advantage":
      return <ComparativeAdvantage key={key} question={q} hint={h} parties={(applet as ComparativeAdvantageApplet).content.parties} goods={(applet as ComparativeAdvantageApplet).content.goods} steps={(applet as ComparativeAdvantageApplet).content.steps} onComplete={onComplete} />;
    case "ordering":
      return <Ordering key={key} question={q} hint={h} items={(applet as OrderingApplet).content.items} correctOrder={(applet as OrderingApplet).content.correctOrder} direction={(applet as OrderingApplet).content.direction} onComplete={onComplete} />;
    case "color-mixing":
      return <ColorMixing key={key} question={q} hint={h} targetHex={(applet as ColorMixingApplet).content.targetHex} targetLabel={(applet as ColorMixingApplet).content.targetLabel} colorBlocks={(applet as ColorMixingApplet).content.colorBlocks} correctBlockIds={(applet as ColorMixingApplet).content.correctBlockIds} mode={(applet as ColorMixingApplet).content.mode} onComplete={onComplete} />;
    case "map-select":
      return <MapSelect key={key} question={q} hint={h} regions={(applet as MapSelectApplet).content.regions} correctRegionIds={(applet as MapSelectApplet).content.correctRegionIds} mapView={(applet as MapSelectApplet).content.mapView} onComplete={onComplete} />;
    case "categorization-grid":
      return <CategorizationGrid key={key} question={q} hint={h} categories={(applet as CategorizationGridApplet).content.categories} items={(applet as CategorizationGridApplet).content.items} correctMapping={(applet as CategorizationGridApplet).content.correctMapping} layout={(applet as CategorizationGridApplet).content.layout} matrixAxes={(applet as CategorizationGridApplet).content.matrixAxes} onComplete={onComplete} />;
    case "fraction-visualizer":
      return <FractionVisualizer key={key} question={q} hint={h} shape={(applet as FractionVisualizerApplet).content.shape} sections={(applet as FractionVisualizerApplet).content.sections} targetNumerator={(applet as FractionVisualizerApplet).content.targetNumerator} targetDenominator={(applet as FractionVisualizerApplet).content.targetDenominator} viewBox={(applet as FractionVisualizerApplet).content.viewBox} onComplete={onComplete} />;
    case "chart-reading":
      return <ChartReading key={key} question={q} hint={h} chartType={(applet as ChartReadingApplet).content.chartType} chartTitle={(applet as ChartReadingApplet).content.chartTitle} data={(applet as ChartReadingApplet).content.data} xAxisLabel={(applet as ChartReadingApplet).content.xAxisLabel} yAxisLabel={(applet as ChartReadingApplet).content.yAxisLabel} selectCount={(applet as ChartReadingApplet).content.selectCount} correctIds={(applet as ChartReadingApplet).content.correctIds} unit={(applet as ChartReadingApplet).content.unit} onComplete={onComplete} />;
    case "match-pairs":
      return <MatchPairs key={key} question={q} hint={h} leftItems={(applet as MatchPairsApplet).content.leftItems} rightItems={(applet as MatchPairsApplet).content.rightItems} correctPairs={(applet as MatchPairsApplet).content.correctPairs} leftColumnLabel={(applet as MatchPairsApplet).content.leftColumnLabel} rightColumnLabel={(applet as MatchPairsApplet).content.rightColumnLabel} onComplete={onComplete} />;
    case "interactive-diagram":
      return <InteractiveDiagram key={key} question={q} hint={h} elements={(applet as InteractiveDiagramApplet).content.elements} correctIds={(applet as InteractiveDiagramApplet).content.correctIds} selectCount={(applet as InteractiveDiagramApplet).content.selectCount} viewBox={(applet as InteractiveDiagramApplet).content.viewBox} diagramTitle={(applet as InteractiveDiagramApplet).content.diagramTitle} onComplete={onComplete} />;
    case "thought-tree":
      return <ThoughtTree key={key} question={q} hint={h} nodes={(applet as ThoughtTreeApplet).content.nodes} finalAnswer={(applet as ThoughtTreeApplet).content.finalAnswer} onComplete={onComplete} />;
    default:
      return <CodeBlocks key={key} question={q} hint={h} language={(applet as CodeBlocksApplet).content.language} lines={(applet as CodeBlocksApplet).content.lines} answerBlocks={(applet as CodeBlocksApplet).content.answerBlocks} onComplete={onComplete} />;
  }
}

export default function CourseLessonPage() {
  const params = useParams();
  const router = useRouter();
  const { refreshProfile } = useAuth();
  const courseId = params.courseId as string;
  const lessonId = params.lessonId as string;

  const [lesson, setLesson] = useState<LessonWithApplets | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);
  const [xpEarned, setXpEarned] = useState(0);
  const [isLessonDone, setIsLessonDone] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const { lesson: data } = await api.getLesson(lessonId);
        setLesson(data);
      } catch {
        // handle error
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [lessonId]);

  const applets = lesson?.applets ?? [];
  const currentApplet = applets[currentIndex];

  const handlePuzzleComplete = (success: boolean) => {
    if (success) {
      if (!completedIndices.includes(currentIndex)) {
        const newCompleted = [...completedIndices, currentIndex];
        setCompletedIndices(newCompleted);
        setXpEarned((prev) => prev + (lesson?.xpReward ?? 10) / applets.length);
        api.awardXp(Math.round((lesson?.xpReward ?? 10) / applets.length)).catch(() => {});

        // Check if all puzzles in lesson are now complete
        if (newCompleted.length === applets.length) {
          // Mark lesson as complete on backend
          api.completeLesson(lessonId, 100).catch(() => {});
          setIsLessonDone(true);
        }
      } else {
        // Already completed — advance to next
        if (currentIndex < applets.length - 1) {
          setCurrentIndex(currentIndex + 1);
        }
      }
    }
  };

  if (isLoading || !lesson) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (applets.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <div className="text-4xl">📭</div>
            <h2 className="text-xl font-bold text-foreground">No exercises in this lesson</h2>
            <Button onClick={() => router.push(`/courses/${courseId}`)}>
              Back to Course
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.push(`/courses/${courseId}`)}>
          ← Back
        </Button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-warning/10 text-warning">
            <span className="text-lg">⚡</span>
            <span className="font-bold text-sm">+{Math.round(xpEarned)} XP</span>
          </div>
          <span className="text-sm font-semibold text-muted-foreground">
            {completedIndices.length} / {applets.length}
          </span>
        </div>
      </div>

      {/* Lesson title */}
      <div className="text-center">
        <span className="text-2xl">{lesson.emoji}</span>
        <h1 className="text-lg font-bold text-foreground mt-1">{lesson.title}</h1>
        {lesson.isCheckpointReview && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-warning/10 text-warning mt-2 inline-block">
            CHECKPOINT REVIEW
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{
            width: `${(completedIndices.length / applets.length) * 100}%`,
          }}
        />
      </div>

      {/* Lesson complete */}
      {isLessonDone ? (
        <Card className="text-center py-12">
          <CardContent className="space-y-6">
            <div className="text-6xl animate-pop">🎉</div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {lesson.isCheckpointReview ? "Checkpoint Passed!" : "Lesson Complete!"}
              </h2>
              <p className="text-muted-foreground mt-2">{lesson.title}</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-warning">
              <span>⚡</span>
              <span>+{Math.round(xpEarned)} XP earned!</span>
            </div>
            <Button
              size="lg"
              onClick={() => {
                refreshProfile();
                router.push(`/courses/${courseId}`);
              }}
            >
              Continue
            </Button>
          </CardContent>
        </Card>
      ) : currentApplet ? (
        <>
          {/* Applet type label */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl">{getAppletEmoji(currentApplet.type)}</span>
          </div>

          {/* Render applet */}
          {renderApplet(currentApplet, handlePuzzleComplete)}

          {/* Explanation reveal — shown after puzzle is completed */}
          {currentApplet.explanation && completedIndices.includes(currentIndex) && (
            <ExplanationReveal explanation={currentApplet.explanation} />
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
            >
              ← Previous
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {applets.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    completedIndices.includes(index)
                      ? "bg-primary"
                      : index === currentIndex
                      ? "bg-accent"
                      : "bg-muted"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentIndex(Math.min(applets.length - 1, currentIndex + 1))}
              disabled={currentIndex === applets.length - 1}
            >
              Next →
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}

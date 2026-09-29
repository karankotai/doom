"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type {
  Applet,
  AppletType,
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
  CircuitBuilderApplet,
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
import { CircuitBuilder } from "@/components/applets/circuit-builder";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APPLET_ICON, courseTintForIndex } from "@/lib/icons";
import { ArrowLeft, type LucideIcon } from "lucide-react";

const APPLET_TYPES: {
  type: AppletType;
  name: string;
  description: string;
}[] = [
  { type: "mcq", name: "Multiple Choice", description: "Pick the correct answer from a short list." },
  { type: "fill-blanks", name: "Fill in the Blanks", description: "Drop words into the gaps to complete sentences." },
  { type: "code-blocks", name: "Code Blocks", description: "Slot code fragments into the right order." },
  { type: "venn-diagram", name: "Venn Diagrams", description: "Shade the regions that match set operations." },
  { type: "highlight-text", name: "Highlight Text", description: "Mark up parts of speech and key terms." },
  { type: "slope-graph", name: "Slope Graphs", description: "Drag points on an axis to hit a target slope." },
  { type: "chess", name: "Chess Tactics", description: "Find the best next move in each position." },
  { type: "comparative-advantage", name: "Comparative Advantage", description: "Who should make what? The math behind trade." },
  { type: "ordering", name: "Ordering", description: "Line up items into the correct sequence." },
  { type: "color-mixing", name: "Color Mixing", description: "Combine color channels to match a target swatch." },
  { type: "map-select", name: "Map Quizzes", description: "Point and click your way through geography and history." },
  { type: "categorization-grid", name: "Categorization Grids", description: "Sort items into the right bucket." },
  { type: "fraction-visualizer", name: "Fractions", description: "Color in slices to build target fractions." },
  { type: "chart-reading", name: "Chart Reading", description: "Read the chart, answer the question." },
  { type: "match-pairs", name: "Match Pairs", description: "Match items between two lists." },
  { type: "interactive-diagram", name: "Interactive Diagrams", description: "Point to the right part of a labeled diagram." },
  { type: "thought-tree", name: "Thought Trees", description: "Navigate a 5-step branch of sub-questions to the answer." },
  { type: "circuit-builder", name: "Circuit Builder", description: "Toggle switches to turn a bulb on (or off)."},
];

export default function AppletsPage() {
  const [selectedType, setSelectedType] = useState<AppletType | null>(null);
  const [applets, setApplets] = useState<Applet[]>([]);
  const [currentAppletIndex, setCurrentAppletIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    if (!selectedType) {
      setApplets([]);
      setCurrentAppletIndex(0);
      setCompletedCount(0);
      return;
    }

    async function fetchApplets() {
      setIsLoading(true);
      try {
        const { applets: fetchedApplets } = await api.getApplets({
          type: selectedType ?? undefined,
          limit: 10,
        });
        setApplets(fetchedApplets);
        setCurrentAppletIndex(0);
        setCompletedCount(0);
      } catch (err) {
        console.error("Failed to fetch applets:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplets();
  }, [selectedType]);

  const currentApplet = applets[currentAppletIndex];

  const handleComplete = (success: boolean) => {
    if (success) setCompletedCount((prev) => prev + 1);
  };

  const handleNext = () => {
    if (currentAppletIndex < applets.length - 1)
      setCurrentAppletIndex(currentAppletIndex + 1);
  };
  const handlePrev = () => {
    if (currentAppletIndex > 0)
      setCurrentAppletIndex(currentAppletIndex - 1);
  };

  const renderApplet = (applet: Applet) => {
    switch (applet.type) {
      case "chess":
        return (
          <ChessPuzzle
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            initialPosition={(applet as ChessApplet).content.initialPosition}
            correctMove={(applet as ChessApplet).content.correctMove}
            correctMoves={(applet as ChessApplet).content.correctMoves}
            onComplete={handleComplete}
          />
        );
      case "slope-graph":
        return (
          <SlopeGraph
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            startPoint={(applet as SlopeGraphApplet).content.startPoint}
            targetPoint={(applet as SlopeGraphApplet).content.targetPoint}
            gridSize={(applet as SlopeGraphApplet).content.gridSize}
            onComplete={handleComplete}
          />
        );
      case "mcq":
        return (
          <Mcq
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            options={(applet as McqApplet).content.options}
            correctOptionId={(applet as McqApplet).content.correctOptionId}
            onComplete={handleComplete}
          />
        );
      case "fill-blanks":
        return (
          <FillBlanks
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            segments={(applet as FillBlanksApplet).content.segments}
            answerBlocks={(applet as FillBlanksApplet).content.answerBlocks}
            onComplete={handleComplete}
          />
        );
      case "venn-diagram":
        return (
          <VennDiagram
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            labels={(applet as VennDiagramApplet).content.labels}
            correctRegions={(applet as VennDiagramApplet).content.correctRegions}
            onComplete={handleComplete}
          />
        );
      case "highlight-text":
        return (
          <HighlightText
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            text={(applet as HighlightTextApplet).content.text}
            categories={(applet as HighlightTextApplet).content.categories}
            correctHighlights={(applet as HighlightTextApplet).content.correctHighlights}
            onComplete={handleComplete}
          />
        );
      case "comparative-advantage":
        return (
          <ComparativeAdvantage
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            parties={(applet as ComparativeAdvantageApplet).content.parties}
            goods={(applet as ComparativeAdvantageApplet).content.goods}
            steps={(applet as ComparativeAdvantageApplet).content.steps}
            onComplete={handleComplete}
          />
        );
      case "ordering":
        return (
          <Ordering
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            items={(applet as OrderingApplet).content.items}
            correctOrder={(applet as OrderingApplet).content.correctOrder}
            direction={(applet as OrderingApplet).content.direction}
            onComplete={handleComplete}
          />
        );
      case "color-mixing":
        return (
          <ColorMixing
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            targetHex={(applet as ColorMixingApplet).content.targetHex}
            targetLabel={(applet as ColorMixingApplet).content.targetLabel}
            colorBlocks={(applet as ColorMixingApplet).content.colorBlocks}
            correctBlockIds={(applet as ColorMixingApplet).content.correctBlockIds}
            mode={(applet as ColorMixingApplet).content.mode}
            onComplete={handleComplete}
          />
        );
      case "map-select":
        return (
          <MapSelect
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            regions={(applet as MapSelectApplet).content.regions}
            correctRegionIds={(applet as MapSelectApplet).content.correctRegionIds}
            mapView={(applet as MapSelectApplet).content.mapView}
            onComplete={handleComplete}
          />
        );
      case "categorization-grid":
        return (
          <CategorizationGrid
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            categories={(applet as CategorizationGridApplet).content.categories}
            items={(applet as CategorizationGridApplet).content.items}
            correctMapping={(applet as CategorizationGridApplet).content.correctMapping}
            layout={(applet as CategorizationGridApplet).content.layout}
            matrixAxes={(applet as CategorizationGridApplet).content.matrixAxes}
            onComplete={handleComplete}
          />
        );
      case "fraction-visualizer":
        return (
          <FractionVisualizer
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            shape={(applet as FractionVisualizerApplet).content.shape}
            sections={(applet as FractionVisualizerApplet).content.sections}
            targetNumerator={(applet as FractionVisualizerApplet).content.targetNumerator}
            targetDenominator={(applet as FractionVisualizerApplet).content.targetDenominator}
            viewBox={(applet as FractionVisualizerApplet).content.viewBox}
            onComplete={handleComplete}
          />
        );
      case "chart-reading":
        return (
          <ChartReading
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            chartType={(applet as ChartReadingApplet).content.chartType}
            chartTitle={(applet as ChartReadingApplet).content.chartTitle}
            data={(applet as ChartReadingApplet).content.data}
            xAxisLabel={(applet as ChartReadingApplet).content.xAxisLabel}
            yAxisLabel={(applet as ChartReadingApplet).content.yAxisLabel}
            selectCount={(applet as ChartReadingApplet).content.selectCount}
            correctIds={(applet as ChartReadingApplet).content.correctIds}
            unit={(applet as ChartReadingApplet).content.unit}
            onComplete={handleComplete}
          />
        );
      case "match-pairs":
        return (
          <MatchPairs
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            leftItems={(applet as MatchPairsApplet).content.leftItems}
            rightItems={(applet as MatchPairsApplet).content.rightItems}
            correctPairs={(applet as MatchPairsApplet).content.correctPairs}
            leftColumnLabel={(applet as MatchPairsApplet).content.leftColumnLabel}
            rightColumnLabel={(applet as MatchPairsApplet).content.rightColumnLabel}
            onComplete={handleComplete}
          />
        );
      case "interactive-diagram":
        return (
          <InteractiveDiagram
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            elements={(applet as InteractiveDiagramApplet).content.elements}
            correctIds={(applet as InteractiveDiagramApplet).content.correctIds}
            selectCount={(applet as InteractiveDiagramApplet).content.selectCount}
            viewBox={(applet as InteractiveDiagramApplet).content.viewBox}
            diagramTitle={(applet as InteractiveDiagramApplet).content.diagramTitle}
            onComplete={handleComplete}
          />
        );
      case "thought-tree":
        return (
          <ThoughtTree
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            nodes={(applet as ThoughtTreeApplet).content.nodes}
            finalAnswer={(applet as ThoughtTreeApplet).content.finalAnswer}
            onComplete={handleComplete}
          />
        );
      case "circuit-builder":
        return (
          <CircuitBuilder
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            nodes={(applet as CircuitBuilderApplet).content.nodes}
            wires={(applet as CircuitBuilderApplet).content.wires}
            correctSwitchStates={(applet as CircuitBuilderApplet).content.correctSwitchStates}
            onComplete={handleComplete}
          />
        );
      case "code-blocks":
      default:
        return (
          <CodeBlocks
            key={applet.id}
            question={applet.question}
            hint={applet.hint}
            language={(applet as CodeBlocksApplet).content.language}
            lines={(applet as CodeBlocksApplet).content.lines}
            answerBlocks={(applet as CodeBlocksApplet).content.answerBlocks}
            onComplete={handleComplete}
          />
        );
    }
  };

  if (!selectedType) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="text-label text-muted-foreground">Applets</div>
          <h1 className="text-h1 text-foreground">Pick a puzzle type.</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            18 different practice formats. All short. All scorable. Pick the one
            that matches how your brain feels today.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {APPLET_TYPES.map((appletType, idx) => {
            const tint = courseTintForIndex(idx);
            const Icon = (APPLET_ICON[appletType.type] ?? null) as
              | LucideIcon
              | null;
            return (
              <button
                key={appletType.type}
                type="button"
                className={`group text-left rounded-xl border ${tint.border} bg-card p-5 transition-all hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring outline-none`}
                onClick={() => setSelectedType(appletType.type)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border ${tint.border} ${tint.bg} ${tint.text}`}
                  >
                    {Icon ? <Icon className="h-5 w-5" /> : null}
                  </div>
                  <div className="min-w-0 space-y-1.5">
                    <div className="text-sm font-bold text-foreground">
                      {appletType.name}
                    </div>
                    <div className="text-caption leading-relaxed text-muted-foreground">
                      {appletType.description}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (applets.length === 0) {
    const typeName =
      APPLET_TYPES.find((t) => t.type === selectedType)?.name ?? "applet";
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" size="sm" onClick={() => setSelectedType(null)}>
          <ArrowLeft className="h-4 w-4" /> Back to gallery
        </Button>
        <Card className="text-center">
          <CardContent className="space-y-3 pt-12 pb-12">
            <h2 className="text-h3 font-bold text-foreground">No {typeName.toLowerCase()} applets yet</h2>
            <p className="text-sm text-muted-foreground">
              This type exists but the practice bank is empty for it. Try another format, or use the generator to make your own.
            </p>
            <div className="flex flex-wrap gap-2 pt-2 justify-center">
              <Button onClick={() => setSelectedType(null)}>Try another type</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedTypeInfo = APPLET_TYPES.find((t) => t.type === selectedType);
  const SelectedIcon = selectedTypeInfo
    ? ((APPLET_ICON[selectedTypeInfo.type] ?? null) as LucideIcon | null)
    : null;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={() => setSelectedType(null)}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Badge
          variant="muted"
          iconLeft={SelectedIcon ? <SelectedIcon className="h-3.5 w-3.5 text-primary" /> : undefined}
        >
          {selectedTypeInfo?.name ?? "Practice"}
        </Badge>
        <div className="text-caption text-muted-foreground tabular-nums">
          {currentAppletIndex + 1} / {applets.length}
        </div>
      </div>

      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${((currentAppletIndex + 1) / applets.length) * 100}%` }}
        />
      </div>

      {currentApplet && renderApplet(currentApplet)}

      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={currentAppletIndex === 0}
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Previous
        </Button>
        <div className="flex gap-1.5">
          {applets.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to applet ${idx + 1}`}
              className={`h-2 w-2.5 rounded-full transition-all ${
                idx === currentAppletIndex
                  ? "bg-primary w-5"
                  : idx < currentAppletIndex
                  ? "bg-primary/50"
                  : "bg-muted"
              }`}
              onClick={() => setCurrentAppletIndex(idx)}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentAppletIndex === applets.length - 1}
        >
          Next
        </Button>
      </div>

      {completedCount > 0 && (
        <div className="flex justify-center">
          <Badge variant="default" size="sm">
            Completed: {completedCount} / {applets.length}
          </Badge>
        </div>
      )}
    </div>
  );
}

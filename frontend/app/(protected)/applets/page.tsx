"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { Applet, AppletType, CodeBlocksApplet, SlopeGraphApplet, ChessApplet, McqApplet, FillBlanksApplet, VennDiagramApplet } from "@/lib/types/applet";
import { ChessPuzzle } from "@/components/applets/chess-puzzle";
import { CodeBlocks } from "@/components/applets/code-blocks";
import { SlopeGraph } from "@/components/applets/slope-graph";
import { Mcq } from "@/components/applets/mcq";
import { FillBlanks } from "@/components/applets/fill-blanks";
import { VennDiagram } from "@/components/applets/venn-diagram";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const APPLET_TYPES: { type: AppletType; name: string; icon: string; description: string }[] = [
  { type: "mcq", name: "Multiple Choice", icon: "❓", description: "Answer questions by selecting the correct option" },
  { type: "fill-blanks", name: "Fill in the Blanks", icon: "📝", description: "Drag and drop words to complete sentences" },
  { type: "code-blocks", name: "Code Blocks", icon: "🧩", description: "Complete code by placing blocks in the right slots" },
  { type: "venn-diagram", name: "Venn Diagram", icon: "⭕", description: "Color regions to represent set operations" },
  { type: "slope-graph", name: "Slope Graph", icon: "📐", description: "Move points on a graph to learn about slopes" },
  { type: "chess", name: "Chess Tactics", icon: "♟️", description: "Find the best move in chess puzzles" },
];

export default function AppletsPage() {
  const [selectedType, setSelectedType] = useState<AppletType | null>(null);
  const [applets, setApplets] = useState<Applet[]>([]);
  const [currentAppletIndex, setCurrentAppletIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  // Fetch applets when type is selected
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
        const { applets: fetchedApplets } = await api.getApplets({ type: selectedType ?? undefined, limit: 10 });
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
    if (success) {
      setCompletedCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentAppletIndex < applets.length - 1) {
      setCurrentAppletIndex(currentAppletIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentAppletIndex > 0) {
      setCurrentAppletIndex(currentAppletIndex - 1);
    }
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

  // Type selection view
  if (!selectedType) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Applet Gallery</h1>
          <p className="text-muted-foreground mt-2">
            Choose an applet type to practice
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {APPLET_TYPES.map((appletType) => (
            <Card
              key={appletType.type}
              className="cursor-pointer transition-all hover:border-primary hover:shadow-duo-primary"
              onClick={() => setSelectedType(appletType.type)}
            >
              <CardHeader className="text-center pb-2">
                <div className="text-4xl mb-2">{appletType.icon}</div>
                <CardTitle className="text-lg">{appletType.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {appletType.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // No applets found
  if (applets.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => setSelectedType(null)}>
          ← Back to Gallery
        </Button>
        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <div className="text-4xl">📭</div>
            <h2 className="text-xl font-bold text-foreground">No applets found</h2>
            <p className="text-muted-foreground">
              There are no {APPLET_TYPES.find(t => t.type === selectedType)?.name} applets yet.
            </p>
            <Button onClick={() => setSelectedType(null)}>
              Try another type
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const selectedTypeInfo = APPLET_TYPES.find(t => t.type === selectedType);

  // Applet view
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => setSelectedType(null)}>
          ← Back
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{selectedTypeInfo?.icon}</span>
          <span className="font-bold text-foreground">{selectedTypeInfo?.name}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {currentAppletIndex + 1} / {applets.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${((currentAppletIndex + 1) / applets.length) * 100}%` }}
        />
      </div>

      {/* Current applet */}
      {currentApplet && renderApplet(currentApplet)}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentAppletIndex === 0}
        >
          ← Previous
        </Button>

        {/* Indicators */}
        <div className="flex gap-2">
          {applets.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentAppletIndex
                  ? "bg-primary scale-125"
                  : index < currentAppletIndex
                  ? "bg-primary/50"
                  : "bg-muted"
              }`}
              onClick={() => setCurrentAppletIndex(index)}
            />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentAppletIndex === applets.length - 1}
        >
          Next →
        </Button>
      </div>

      {/* Completed count */}
      {completedCount > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Completed: {completedCount} / {applets.length}
        </p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type {
  GeneratedExercise,
  McqContent,
  FillBlanksContent,
  VennDiagramContent,
  HighlightTextContent,
} from "@/lib/types/applet";
import { Mcq } from "@/components/applets/mcq";
import { FillBlanks } from "@/components/applets/fill-blanks";
import { VennDiagram } from "@/components/applets/venn-diagram";
import { HighlightText } from "@/components/applets/highlight-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowLeft, type LucideIcon } from "lucide-react";
import { APPLET_ICON } from "@/lib/icons";

const DIFFICULTY_OPTIONS = [
  { value: 1, label: "Easy", description: "First look at a topic" },
  { value: 2, label: "Medium", description: "Concepts with some nuance" },
  { value: 3, label: "Hard", description: "Requires real understanding" },
] as const;

export default function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState(1);
  const [exercises, setExercises] = useState<GeneratedExercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedCount, setCompletedCount] = useState(0);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);
    setExercises([]);
    setCurrentIndex(0);
    setCompletedCount(0);

    try {
      const { exercises: generated } = await api.generateExercises(
        topic.trim(),
        difficulty
      );
      setExercises(generated);
    } catch (err) {
      console.error("Generation error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to generate exercises"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = (success: boolean) => {
    if (success) setCompletedCount((prev) => prev + 1);
  };
  const handleNext = () => {
    if (currentIndex < exercises.length - 1) setCurrentIndex(currentIndex + 1);
  };
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const handleReset = () => {
    setExercises([]);
    setCurrentIndex(0);
    setCompletedCount(0);
  };

  const currentExercise = exercises[currentIndex];

  const renderExercise = (exercise: GeneratedExercise) => {
    switch (exercise.type) {
      case "mcq": {
        const mcqContent = exercise.content as unknown as McqContent;
        return (
          <Mcq
            key={`${exercise.title}-${currentIndex}`}
            question={exercise.question}
            hint={exercise.hint}
            options={mcqContent.options}
            correctOptionId={mcqContent.correctOptionId}
            onComplete={handleComplete}
          />
        );
      }
      case "fill-blanks": {
        const fillContent = exercise.content as unknown as FillBlanksContent;
        return (
          <FillBlanks
            key={`${exercise.title}-${currentIndex}`}
            question={exercise.question}
            hint={exercise.hint}
            segments={fillContent.segments}
            answerBlocks={fillContent.answerBlocks}
            onComplete={handleComplete}
          />
        );
      }
      case "venn-diagram": {
        const vennContent = exercise.content as unknown as VennDiagramContent;
        return (
          <VennDiagram
            key={`${exercise.title}-${currentIndex}`}
            question={exercise.question}
            hint={exercise.hint}
            labels={vennContent.labels}
            correctRegions={vennContent.correctRegions}
            onComplete={handleComplete}
          />
        );
      }
      case "highlight-text": {
        const hl = exercise.content as unknown as HighlightTextContent;
        return (
          <HighlightText
            key={`${exercise.title}-${currentIndex}`}
            question={exercise.question}
            hint={exercise.hint}
            text={hl.text}
            categories={hl.categories}
            correctHighlights={hl.correctHighlights}
            onComplete={handleComplete}
          />
        );
      }
      default:
        return <div>Unknown exercise type</div>;
    }
  };

  if (exercises.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="text-label text-muted-foreground">Generate</div>
          <h1 className="text-h1 text-foreground">Ask for what you need.</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Type in any topic, pick a difficulty, and get five interactive exercises.
            The generator makes MCQs, fill-in-blanks, Venn diagrams, and highlight-text problems.
          </p>
        </div>

        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-h3">What do you want to practice?</CardTitle>
            <CardDescription className="pt-1">
              Be specific. "French Revolution causes" beats "history."
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-5 space-y-6">
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic">Learning topic</Label>
                <Input
                  id="topic"
                  type="text"
                  placeholder="e.g. Photosynthesis, World War II, JavaScript arrays…"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  maxLength={200}
                  disabled={isLoading}
                />
                <div className="flex items-center justify-between text-caption">
                  <span className="text-muted-foreground">
                    {topic.length}/200 characters
                  </span>
                  {topic.length > 160 && (
                    <span className="text-warning">Short topics work better.</span>
                  )}
                </div>
              </div>

              <div className="space-y-2.5">
                <Label>Difficulty</Label>
                <div
                  role="tablist"
                  aria-label="Difficulty selector"
                  className="grid grid-cols-3 rounded-lg border border-border bg-muted/40 p-1"
                >
                  {DIFFICULTY_OPTIONS.map((opt) => {
                    const active = difficulty === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setDifficulty(opt.value)}
                        disabled={isLoading}
                        className={`group relative rounded-md px-2.5 py-2.5 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                          active
                            ? "bg-card text-foreground shadow-sm border border-border"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <div className="text-sm font-bold">{opt.label}</div>
                        <div className="text-[11px] leading-tight text-muted-foreground/90 mt-0.5 line-clamp-2">
                          {opt.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading || !topic.trim()}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Generating exercises…
                  </span>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate 5 exercises
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-accent/30 bg-accent/[0.04]">
          <CardContent className="pt-5">
            <div className="text-sm font-bold text-foreground mb-2.5 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Tips for better results
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground leading-relaxed">
              <li>· Be specific: "Causes of the 2008 financial crisis" works better than "economics."</li>
              <li>· Include audience: "Python lists for total beginners" sets the right level.</li>
              <li>· Narrow is good: "The Krebs cycle inputs and outputs" is the ideal prompt.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  const diffMeta = DIFFICULTY_OPTIONS.find((d) => d.value === difficulty);
  const exercise = currentExercise;
  const TypeIcon = exercise
    ? ((APPLET_ICON[exercise.type as keyof typeof APPLET_ICON] ?? null) as
        | LucideIcon
        | null)
    : null;

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <ArrowLeft className="h-4 w-4" />
          New topic
        </Button>
        <div className="text-center min-w-0">
          <div className="text-sm font-bold text-foreground truncate max-w-[18rem] sm:max-w-xs">
            {topic}
          </div>
          <div className="text-caption text-muted-foreground">
            {diffMeta ? `Difficulty: ${diffMeta.label}` : null}
          </div>
        </div>
        <div className="text-caption text-muted-foreground tabular-nums">
          {currentIndex + 1} / {exercises.length}
        </div>
      </div>

      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / exercises.length) * 100}%`,
          }}
        />
      </div>

      {exercise && (
        <div className="flex justify-center">
          <Badge
            variant="purple"
            size="sm"
            iconLeft={TypeIcon ? <TypeIcon className="h-3.5 w-3.5" /> : undefined}
          >
            {exercise.type === "mcq" && "Multiple choice"}
            {exercise.type === "fill-blanks" && "Fill in the blanks"}
            {exercise.type === "venn-diagram" && "Venn diagram"}
            {exercise.type === "highlight-text" && "Highlight text"}
          </Badge>
        </div>
      )}

      {exercise && renderExercise(exercise)}

      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Previous
        </Button>
        <div className="flex gap-1.5">
          {exercises.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to exercise ${idx + 1}`}
              className={`h-2 w-2.5 rounded-full transition-all ${
                idx === currentIndex
                  ? "bg-primary w-5"
                  : idx < currentIndex
                  ? "bg-primary/50"
                  : "bg-muted"
              }`}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentIndex === exercises.length - 1}
        >
          Next
        </Button>
      </div>

      {completedCount > 0 && (
        <div className="flex justify-center">
          <Badge variant="default" size="sm">
            Completed: {completedCount} / {exercises.length}
          </Badge>
        </div>
      )}

      {currentIndex === exercises.length - 1 && (
        <div className="pt-3 flex justify-center">
          <Button onClick={handleReset} size="sm" variant="secondary">
            Generate more exercises
          </Button>
        </div>
      )}
    </div>
  );
}

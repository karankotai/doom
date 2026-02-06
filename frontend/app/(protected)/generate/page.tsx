"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { GeneratedExercise, McqContent, FillBlanksContent, VennDiagramContent } from "@/lib/types/applet";
import { Mcq } from "@/components/applets/mcq";
import { FillBlanks } from "@/components/applets/fill-blanks";
import { VennDiagram } from "@/components/applets/venn-diagram";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DIFFICULTY_OPTIONS = [
  { value: 1, label: "Easy", description: "Basic concepts and simple questions" },
  { value: 2, label: "Medium", description: "Requires understanding of the topic" },
  { value: 3, label: "Hard", description: "Challenging questions for advanced learners" },
];

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
      const { exercises: generated } = await api.generateExercises(topic.trim(), difficulty);
      setExercises(generated);
    } catch (err) {
      console.error("Generation error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate exercises");
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = (success: boolean) => {
    if (success) {
      setCompletedCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
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
      default:
        return <div>Unknown exercise type</div>;
    }
  };

  // Form view (no exercises generated yet)
  if (exercises.length === 0) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Generate Exercises</h1>
          <p className="text-muted-foreground mt-2">
            Enter a topic and let AI create interactive exercises for you
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What would you like to learn?</CardTitle>
            <CardDescription>
              Enter any topic - history, science, programming, languages, and more!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="space-y-6">
              {/* Topic input */}
              <div className="space-y-2">
                <Label htmlFor="topic">Learning Topic</Label>
                <Input
                  id="topic"
                  type="text"
                  placeholder="e.g., Photosynthesis, World War II, JavaScript arrays..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  maxLength={200}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  {topic.length}/200 characters
                </p>
              </div>

              {/* Difficulty selector */}
              <div className="space-y-3">
                <Label>Difficulty Level</Label>
                <div className="grid gap-3">
                  {DIFFICULTY_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setDifficulty(option.value)}
                      disabled={isLoading}
                      className={`p-4 rounded-xl border-2 text-left transition-all ${
                        difficulty === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-bold text-foreground">{option.label}</div>
                      <div className="text-sm text-muted-foreground">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading || !topic.trim()}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Generating exercises...
                  </span>
                ) : (
                  "Generate Exercises"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-accent/5 border-accent/20">
          <CardContent className="pt-6">
            <h3 className="font-bold text-foreground mb-3">Tips for better results</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Be specific: "The French Revolution causes" works better than just "history"</li>
              <li>Include context: "Python lists for beginners" helps set the right level</li>
              <li>Try different topics: Science, math, languages, history, programming, and more!</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Exercises view
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={handleReset}>
          New Topic
        </Button>
        <div className="text-center">
          <h2 className="font-bold text-foreground">{topic}</h2>
          <p className="text-xs text-muted-foreground">
            Difficulty: {DIFFICULTY_OPTIONS[difficulty - 1]?.label}
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {currentIndex + 1} / {exercises.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
        />
      </div>

      {/* Exercise title */}
      {currentExercise && (
        <div className="text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold uppercase">
            {currentExercise.type === "mcq" && "Multiple Choice"}
            {currentExercise.type === "fill-blanks" && "Fill in the Blanks"}
            {currentExercise.type === "venn-diagram" && "Venn Diagram"}
          </span>
        </div>
      )}

      {/* Current exercise */}
      {currentExercise && renderExercise(currentExercise)}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>

        {/* Indicators */}
        <div className="flex gap-2">
          {exercises.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary scale-125"
                  : index < currentIndex
                  ? "bg-primary/50"
                  : "bg-muted"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentIndex === exercises.length - 1}
        >
          Next
        </Button>
      </div>

      {/* Completed count */}
      {completedCount > 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Completed: {completedCount} / {exercises.length}
        </p>
      )}

      {/* Finish button when all completed */}
      {currentIndex === exercises.length - 1 && (
        <div className="text-center pt-4">
          <Button onClick={handleReset} size="lg">
            Generate More Exercises
          </Button>
        </div>
      )}
    </div>
  );
}

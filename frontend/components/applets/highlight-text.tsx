"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { HighlightSpan } from "@/lib/types/applet";

interface HighlightTextProps {
  question: string;
  hint?: string;
  text: string;
  categories: string[];
  correctHighlights: HighlightSpan[];
  onComplete: (success: boolean) => void;
}

interface WordInfo {
  word: string;
  startIndex: number;
  endIndex: number;
  index: number;
}

interface FoundHighlight extends HighlightSpan {
  found: boolean;
}

// Category colors for visual distinction
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  noun: { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-400" },
  pronoun: { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-400" },
  verb: { bg: "bg-green-100", text: "text-green-700", border: "border-green-400" },
  adjective: { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-400" },
  adverb: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-400" },
  article: { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-400" },
  preposition: { bg: "bg-cyan-100", text: "text-cyan-700", border: "border-cyan-400" },
  conjunction: { bg: "bg-indigo-100", text: "text-indigo-700", border: "border-indigo-400" },
  subject: { bg: "bg-emerald-100", text: "text-emerald-700", border: "border-emerald-400" },
  predicate: { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-400" },
};

const DEFAULT_COLOR = { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-400" };

function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category.toLowerCase()] || DEFAULT_COLOR;
}

export function HighlightText({
  question,
  hint,
  text,
  categories,
  correctHighlights,
  onComplete,
}: HighlightTextProps) {
  // Parse text into words with their positions
  const words: WordInfo[] = [];
  const regex = /\S+/g;
  let match;
  let wordIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    words.push({
      word: match[0],
      startIndex: match.index,
      endIndex: match.index + match[0].length,
      index: wordIndex++,
    });
  }

  // State
  const [selectionStart, setSelectionStart] = useState<number | null>(null);
  const [selectionEnd, setSelectionEnd] = useState<number | null>(null);
  const [foundHighlights, setFoundHighlights] = useState<Map<string, FoundHighlight>>(
    () => new Map(correctHighlights.map((h) => [`${h.startIndex}-${h.endIndex}`, { ...h, found: false }]))
  );
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Get selected text range
  const getSelectedRange = useCallback(() => {
    if (selectionStart === null || selectionEnd === null) return null;
    const start = Math.min(selectionStart, selectionEnd);
    const end = Math.max(selectionStart, selectionEnd);
    const selectedWords = words.filter((w) => w.index >= start && w.index <= end);
    if (selectedWords.length === 0) return null;
    const firstWord = selectedWords[0]!;
    const lastWord = selectedWords[selectedWords.length - 1]!;
    return {
      text: selectedWords.map((w) => w.word).join(" "),
      startIndex: firstWord.startIndex,
      endIndex: lastWord.endIndex,
    };
  }, [selectionStart, selectionEnd, words]);

  // Handle word click
  const handleWordClick = (wordIndex: number) => {
    if (isComplete) return;

    if (selectionStart === null) {
      setSelectionStart(wordIndex);
      setSelectionEnd(wordIndex);
    } else if (selectionEnd === wordIndex && selectionStart === wordIndex) {
      // Clicking same word again deselects
      setSelectionStart(null);
      setSelectionEnd(null);
    } else {
      // Extend selection
      setSelectionEnd(wordIndex);
    }
    setFeedback(null);
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    const range = getSelectedRange();
    if (!range) {
      setFeedback({ type: "error", message: "Select some text first!" });
      return;
    }

    // Check if this matches a correct highlight
    const key = `${range.startIndex}-${range.endIndex}`;
    const highlight = foundHighlights.get(key);

    if (highlight && highlight.category.toLowerCase() === category.toLowerCase() && !highlight.found) {
      // Correct!
      const newFound = new Map(foundHighlights);
      newFound.set(key, { ...highlight, found: true });
      setFoundHighlights(newFound);
      setFeedback({ type: "success", message: `Correct! "${range.text}" is a ${category}.` });

      // Check if all found
      const allFound = Array.from(newFound.values()).every((h) => h.found);
      if (allFound) {
        setIsComplete(true);
        setTimeout(() => onComplete(true), 1500);
      }
    } else if (highlight && highlight.category.toLowerCase() !== category.toLowerCase()) {
      setFeedback({ type: "error", message: `"${range.text}" is not a ${category}. Try another category!` });
    } else {
      setFeedback({ type: "error", message: `"${range.text}" is not a ${category} in this exercise.` });
    }

    // Clear selection
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  // Count found per category
  const getCategoryCount = (category: string) => {
    const total = correctHighlights.filter((h) => h.category.toLowerCase() === category.toLowerCase()).length;
    const found = Array.from(foundHighlights.values()).filter(
      (h) => h.category.toLowerCase() === category.toLowerCase() && h.found
    ).length;
    return { found, total };
  };

  // Check if word is in selection
  const isWordSelected = (wordIndex: number) => {
    if (selectionStart === null || selectionEnd === null) return false;
    const start = Math.min(selectionStart, selectionEnd);
    const end = Math.max(selectionStart, selectionEnd);
    return wordIndex >= start && wordIndex <= end;
  };

  // Check if word is part of a found highlight
  const getWordHighlight = (word: WordInfo): FoundHighlight | null => {
    for (const highlight of foundHighlights.values()) {
      if (highlight.found && word.startIndex >= highlight.startIndex && word.endIndex <= highlight.endIndex) {
        return highlight;
      }
    }
    return null;
  };

  const totalFound = Array.from(foundHighlights.values()).filter((h) => h.found).length;
  const totalRequired = correctHighlights.length;

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold text-foreground">{question}</CardTitle>
        {hint && (
          <Button
            variant="ghost"
            size="sm"
            className="w-fit text-muted-foreground"
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? "Hide hint" : "Show hint"}
          </Button>
        )}
        {showHint && hint && (
          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">{hint}</p>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-bold text-foreground">
            {totalFound} / {totalRequired} found
          </span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${(totalFound / totalRequired) * 100}%` }}
          />
        </div>

        {/* Text area */}
        <div className="p-4 rounded-xl bg-muted/30 border-2 border-border">
          <p className="text-lg leading-relaxed select-none">
            {words.map((word, idx) => {
              const foundHighlight = getWordHighlight(word);
              const isSelected = isWordSelected(word.index);
              const colors = foundHighlight ? getCategoryColor(foundHighlight.category) : null;

              // Add space between words
              const prevWord = words[idx - 1];
              const spaceBefore = prevWord ? text.slice(prevWord.endIndex, word.startIndex) : "";

              return (
                <span key={word.index}>
                  {spaceBefore}
                  <span
                    onClick={() => handleWordClick(word.index)}
                    className={`
                      cursor-pointer rounded px-0.5 py-0.5 transition-all
                      ${isSelected ? "bg-primary/30 ring-2 ring-primary" : ""}
                      ${foundHighlight ? `${colors?.bg} ${colors?.text} border-b-2 ${colors?.border}` : ""}
                      ${!isSelected && !foundHighlight ? "hover:bg-muted" : ""}
                    `}
                  >
                    {word.word}
                  </span>
                </span>
              );
            })}
          </p>
        </div>

        {/* Instructions */}
        <p className="text-sm text-muted-foreground text-center">
          Click words to select them, then choose a category below
        </p>

        {/* Category buttons */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => {
            const { found, total } = getCategoryCount(category);
            const colors = getCategoryColor(category);
            const allFound = found === total;

            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                disabled={isComplete || allFound}
                className={`
                  px-4 py-2 rounded-xl border-2 font-bold text-sm transition-all
                  ${allFound
                    ? `${colors.bg} ${colors.text} ${colors.border} opacity-60`
                    : `border-border hover:${colors.border} hover:${colors.bg}`
                  }
                  disabled:cursor-not-allowed
                `}
              >
                <span className="capitalize">{category}</span>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${colors.bg} ${colors.text}`}>
                  {found}/{total}
                </span>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`p-4 rounded-xl text-center font-medium ${
              feedback.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {feedback.message}
          </div>
        )}

        {/* Completion message */}
        {isComplete && (
          <div className="p-6 rounded-xl bg-green-100 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <p className="font-bold text-green-700 text-lg">Perfect!</p>
            <p className="text-green-600">You found all the parts of speech!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

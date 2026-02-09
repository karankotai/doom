"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---

export interface CategoryItem {
  id: string;
  text: string;
  emoji?: string;
}

export interface GridCategory {
  id: string;
  label: string;
  emoji?: string;
}

export interface CategorizationGridContent {
  categories: GridCategory[];
  items: CategoryItem[];
  correctMapping: Record<string, string>; // itemId -> categoryId
  layout: "columns" | "matrix"; // columns = side by side, matrix = 2x2 grid
  matrixAxes?: {
    rowLabel: string;
    colLabel: string;
  };
}

interface CategorizationGridProps {
  question: string;
  hint?: string;
  categories: GridCategory[];
  items: CategoryItem[];
  correctMapping: Record<string, string>;
  layout: "columns" | "matrix";
  matrixAxes?: {
    rowLabel: string;
    colLabel: string;
  };
  onComplete?: (success: boolean) => void;
}

// --- Helpers ---

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i]!;
    copy[i] = copy[j]!;
    copy[j] = temp;
  }
  return copy;
}

// --- Component ---

export function CategorizationGrid({
  question,
  hint,
  categories,
  items,
  correctMapping,
  layout,
  matrixAxes,
  onComplete,
}: CategorizationGridProps) {
  // Shuffled pool of items
  const shuffledItems = useMemo(() => shuffleArray(items), [items]);

  // State: which items are in which category
  const [placements, setPlacements] = useState<Record<string, string[]>>(() => {
    const initial: Record<string, string[]> = {};
    for (const cat of categories) {
      initial[cat.id] = [];
    }
    return initial;
  });

  // Items still in the pool (not placed anywhere)
  const poolItems = useMemo(() => {
    const placedIds = new Set(Object.values(placements).flat());
    return shuffledItems.filter((item) => !placedIds.has(item.id));
  }, [shuffledItems, placements]);

  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverCategoryId, setDragOverCategoryId] = useState<string | null>(null);
  const [validationResults, setValidationResults] = useState<Record<
    string,
    "correct" | "incorrect"
  > | null>(null);

  // Touch drag state
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const [touchDragItemId, setTouchDragItemId] = useState<string | null>(null);

  const itemMap = useMemo(() => {
    const m = new Map<string, CategoryItem>();
    for (const item of items) {
      m.set(item.id, item);
    }
    return m;
  }, [items]);

  // --- Place / remove items ---

  const placeItem = useCallback(
    (itemId: string, categoryId: string) => {
      if (isComplete) return;
      setPlacements((prev) => {
        const next: Record<string, string[]> = {};
        // Remove item from any other category first
        for (const [catId, itemIds] of Object.entries(prev)) {
          next[catId] = itemIds.filter((id) => id !== itemId);
        }
        // Add to target category
        next[categoryId] = [...(next[categoryId] ?? []), itemId];
        return next;
      });
      setFeedback(null);
      setValidationResults(null);
    },
    [isComplete]
  );

  const removeItem = useCallback(
    (itemId: string) => {
      if (isComplete) return;
      setPlacements((prev) => {
        const next: Record<string, string[]> = {};
        for (const [catId, itemIds] of Object.entries(prev)) {
          next[catId] = itemIds.filter((id) => id !== itemId);
        }
        return next;
      });
      setFeedback(null);
      setValidationResults(null);
    },
    [isComplete]
  );

  // --- HTML5 Drag & Drop ---

  const handleDragStart = useCallback(
    (e: React.DragEvent, itemId: string) => {
      if (isComplete) return;
      e.dataTransfer.setData("text/plain", itemId);
      e.dataTransfer.effectAllowed = "move";
      setDraggedItemId(itemId);
    },
    [isComplete]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, categoryId: string) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverCategoryId(categoryId);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setDragOverCategoryId(null);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, categoryId: string) => {
      e.preventDefault();
      const itemId = e.dataTransfer.getData("text/plain");
      if (itemId) {
        placeItem(itemId, categoryId);
      }
      setDraggedItemId(null);
      setDragOverCategoryId(null);
    },
    [placeItem]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedItemId(null);
    setDragOverCategoryId(null);
  }, []);

  // --- Drop on pool to remove ---
  const handlePoolDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverCategoryId("__pool__");
  }, []);

  const handlePoolDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const itemId = e.dataTransfer.getData("text/plain");
      if (itemId) {
        removeItem(itemId);
      }
      setDraggedItemId(null);
      setDragOverCategoryId(null);
    },
    [removeItem]
  );

  // --- Touch drag ---

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, itemId: string) => {
      if (isComplete) return;
      const touch = e.touches[0];
      if (!touch) return;

      setTouchDragItemId(itemId);
      setDraggedItemId(itemId);

      const item = itemMap.get(itemId);
      if (!item) return;

      const ghost = document.createElement("div");
      ghost.className =
        "fixed pointer-events-none z-50 flex items-center gap-2 px-3 py-2 rounded-xl border-2 border-accent bg-card font-semibold shadow-lg opacity-90 text-sm";
      ghost.innerHTML = `${item.emoji ? `<span>${item.emoji}</span>` : ""}<span>${item.text}</span>`;
      ghost.style.left = `${touch.clientX - 80}px`;
      ghost.style.top = `${touch.clientY - 20}px`;
      ghost.style.maxWidth = "200px";
      document.body.appendChild(ghost);
      ghostRef.current = ghost;
    },
    [isComplete, itemMap]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (touchDragItemId === null) return;
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch || !ghostRef.current) return;

      ghostRef.current.style.left = `${touch.clientX - 80}px`;
      ghostRef.current.style.top = `${touch.clientY - 20}px`;

      // Find element under touch
      ghostRef.current.style.display = "none";
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      ghostRef.current.style.display = "";

      const catEl = el?.closest("[data-category-id]");
      if (catEl) {
        const catId = catEl.getAttribute("data-category-id") ?? null;
        setDragOverCategoryId(catId);
      } else {
        setDragOverCategoryId(null);
      }
    },
    [touchDragItemId]
  );

  const handleTouchEnd = useCallback(() => {
    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
    }

    if (touchDragItemId && dragOverCategoryId) {
      if (dragOverCategoryId === "__pool__") {
        removeItem(touchDragItemId);
      } else {
        placeItem(touchDragItemId, dragOverCategoryId);
      }
    }

    setTouchDragItemId(null);
    setDraggedItemId(null);
    setDragOverCategoryId(null);
  }, [touchDragItemId, dragOverCategoryId, placeItem, removeItem]);

  // --- Check answer ---

  const checkAnswer = useCallback(() => {
    const results: Record<string, "correct" | "incorrect"> = {};
    let allCorrect = true;

    // Check that all items are placed
    if (poolItems.length > 0) {
      setFeedback("incorrect");
      return;
    }

    for (const [catId, itemIds] of Object.entries(placements)) {
      for (const itemId of itemIds) {
        if (correctMapping[itemId] === catId) {
          results[itemId] = "correct";
        } else {
          results[itemId] = "incorrect";
          allCorrect = false;
        }
      }
    }

    setValidationResults(results);

    if (allCorrect) {
      setFeedback("correct");
      setIsComplete(true);
      onComplete?.(true);
    } else {
      setFeedback("incorrect");
    }
  }, [placements, correctMapping, poolItems.length, onComplete]);

  const resetPuzzle = useCallback(() => {
    const initial: Record<string, string[]> = {};
    for (const cat of categories) {
      initial[cat.id] = [];
    }
    setPlacements(initial);
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
    setValidationResults(null);
  }, [categories]);

  // Count totals
  const totalItems = items.length;
  const placedCount = totalItems - poolItems.length;

  // --- Matrix layout helpers ---
  const isMatrix = layout === "matrix" && categories.length === 4;

  // --- Render a single item chip ---
  const renderItemChip = (item: CategoryItem, context: "pool" | "placed") => {
    const validation = validationResults?.[item.id];
    const isDragging = draggedItemId === item.id;

    return (
      <div
        key={item.id}
        draggable={!isComplete}
        onDragStart={(e) => handleDragStart(e, item.id)}
        onDragEnd={handleDragEnd}
        onTouchStart={(e) => handleTouchStart(e, item.id)}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border-2 text-sm font-semibold transition-all select-none",
          "bg-card shadow-cosmos",
          !isComplete && "cursor-grab active:cursor-grabbing",
          isDragging && "opacity-40 scale-95",
          validation === "correct" && "border-primary bg-primary/10 text-primary",
          validation === "incorrect" && "border-destructive bg-destructive/10 text-destructive",
          !validation && context === "pool" && "border-border hover:border-accent hover:bg-accent/5",
          !validation && context === "placed" && "border-accent/50 bg-accent/5",
          isComplete && "pointer-events-none"
        )}
        onClick={() => {
          if (isComplete) return;
          if (context === "placed") removeItem(item.id);
        }}
      >
        {item.emoji && <span>{item.emoji}</span>}
        <span>{item.text}</span>
        {context === "placed" && !isComplete && !validation && (
          <span className="text-muted-foreground text-xs ml-0.5">x</span>
        )}
        {validation === "correct" && <span className="ml-0.5">&#10003;</span>}
        {validation === "incorrect" && <span className="ml-0.5">&#10007;</span>}
      </div>
    );
  };

  // --- Render a category drop zone ---
  const renderCategoryZone = (category: GridCategory) => {
    const catItems = (placements[category.id] ?? [])
      .map((id) => itemMap.get(id))
      .filter((item): item is CategoryItem => item !== undefined);
    const isOver = dragOverCategoryId === category.id;

    return (
      <div
        key={category.id}
        data-category-id={category.id}
        onDragOver={(e) => handleDragOver(e, category.id)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, category.id)}
        className={cn(
          "flex flex-col rounded-2xl border-2 border-dashed transition-all min-h-[120px]",
          isOver && "border-accent bg-accent/10 scale-[1.01]",
          !isOver && "border-border bg-muted/30"
        )}
      >
        {/* Category header */}
        <div className="flex items-center justify-center gap-2 px-3 py-2.5 border-b border-border/50 bg-muted/50 rounded-t-2xl">
          {category.emoji && <span className="text-lg">{category.emoji}</span>}
          <span className="font-bold text-sm text-foreground">{category.label}</span>
        </div>

        {/* Dropped items */}
        <div className="flex-1 p-3 flex flex-wrap gap-2 content-start">
          {catItems.length === 0 && !isOver && (
            <p className="text-xs text-muted-foreground/60 italic w-full text-center mt-4">
              Drop items here
            </p>
          )}
          {catItems.map((item) => renderItemChip(item, "placed"))}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl sm:text-2xl">{question}</CardTitle>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-1">
          Sort {totalItems} items into {categories.length} categories
        </p>
        {hint && showHint && (
          <p className="text-sm text-muted-foreground mt-2 animate-pop">
            {hint}
          </p>
        )}
      </CardHeader>

      <CardContent
        className="space-y-5"
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Feedback banner */}
        {feedback && (
          <div
            className={cn(
              "text-center py-2 px-4 rounded-xl font-bold text-white animate-pop",
              feedback === "correct" ? "bg-primary" : "bg-destructive"
            )}
          >
            {feedback === "correct"
              ? "Correct! All items sorted correctly!"
              : poolItems.length > 0
              ? `Place all items first! (${poolItems.length} remaining)`
              : "Not quite right — check the highlighted items and try again!"}
          </div>
        )}

        {/* Item pool */}
        <div
          data-category-id="__pool__"
          onDragOver={handlePoolDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handlePoolDrop}
          className={cn(
            "rounded-2xl border-2 p-4 transition-all",
            dragOverCategoryId === "__pool__" ? "border-accent bg-accent/5" : "border-border bg-card",
            poolItems.length === 0 && !draggedItemId && "py-2"
          )}
        >
          {poolItems.length > 0 ? (
            <>
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-3 text-center">
                Items to sort ({poolItems.length} remaining)
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {poolItems.map((item) => renderItemChip(item, "pool"))}
              </div>
            </>
          ) : (
            <p className="text-xs font-semibold text-primary text-center">
              All items placed ({placedCount}/{totalItems})
            </p>
          )}
        </div>

        {/* Category grid */}
        {isMatrix ? (
          /* 2x2 matrix layout with axis labels */
          <div className="space-y-2">
            {matrixAxes && (
              <p className="text-center text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {matrixAxes.colLabel} &rarr;
              </p>
            )}
            <div className="flex gap-2">
              {matrixAxes && (
                <div className="flex items-center justify-center w-6 flex-shrink-0">
                  <span
                    className="text-xs font-bold uppercase tracking-wide text-muted-foreground whitespace-nowrap"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    {matrixAxes.rowLabel} &rarr;
                  </span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3 flex-1">
                {categories.map((cat) => renderCategoryZone(cat))}
              </div>
            </div>
          </div>
        ) : (
          /* Columns layout */
          <div
            className={cn(
              "grid gap-3",
              categories.length === 2 && "grid-cols-2",
              categories.length === 3 && "grid-cols-3",
              categories.length >= 4 && "grid-cols-2 sm:grid-cols-4"
            )}
          >
            {categories.map((cat) => renderCategoryZone(cat))}
          </div>
        )}

        {/* Controls */}
        <div className="flex gap-3 justify-center pt-2">
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
          {!isComplete && (
            <Button
              size="sm"
              onClick={checkAnswer}
              disabled={poolItems.length > 0}
            >
              Check
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

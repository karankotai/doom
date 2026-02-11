"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---

type FillBlanksSegment =
  | { type: "text"; content: string }
  | { type: "slot"; slotId: string; correctAnswerId: string };

interface AnswerBlock {
  id: string;
  content: string;
}

export interface FillBlanksContent {
  segments: FillBlanksSegment[];
  answerBlocks: AnswerBlock[];
}

interface FillBlanksProps {
  question: string;
  hint?: string;
  segments: FillBlanksSegment[];
  answerBlocks: AnswerBlock[];
  onComplete?: (success: boolean) => void;
}

// --- Helpers ---

function getBlockContent(
  blocks: AnswerBlock[],
  blockId: string
): string | undefined {
  return blocks.find((b) => b.id === blockId)?.content;
}

// --- Component ---

export function FillBlanks({
  question,
  hint,
  segments,
  answerBlocks,
  onComplete,
}: FillBlanksProps) {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [dragOverSlotId, setDragOverSlotId] = useState<string | null>(null);
  const [validationResults, setValidationResults] = useState<Record<
    string,
    "correct" | "incorrect"
  > | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Touch drag state
  const [touchDragBlockId, setTouchDragBlockId] = useState<string | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);

  // Derived: blocks not yet placed in any slot
  const availableBlocks = useMemo(() => {
    const placedIds = new Set(Object.values(placements));
    return answerBlocks.filter((b) => !placedIds.has(b.id));
  }, [answerBlocks, placements]);

  // Derived: total slots and whether all are filled
  const slotIds = useMemo(() => {
    const ids: string[] = [];
    for (const seg of segments) {
      if (seg.type === "slot") ids.push(seg.slotId);
    }
    return ids;
  }, [segments]);

  const allSlotsFilled = slotIds.every((id) => placements[id]);

  // --- Core Logic ---

  const clearValidation = useCallback(() => {
    setValidationResults(null);
    setFeedback(null);
  }, []);

  const placeBlock = useCallback(
    (slotId: string, blockId: string) => {
      setPlacements((prev) => {
        const next = { ...prev };
        // Remove this block from any other slot it was in
        for (const [sid, bid] of Object.entries(next)) {
          if (bid === blockId) delete next[sid];
        }
        // Place it in the target slot (displaces any existing block)
        next[slotId] = blockId;
        return next;
      });
      setSelectedBlockId(null);
      clearValidation();
    },
    [clearValidation]
  );

  const removeBlock = useCallback(
    (slotId: string) => {
      setPlacements((prev) => {
        const next = { ...prev };
        delete next[slotId];
        return next;
      });
      clearValidation();
    },
    [clearValidation]
  );

  const checkAnswers = useCallback(() => {
    const results: Record<string, "correct" | "incorrect"> = {};
    let allCorrect = true;

    for (const seg of segments) {
      if (seg.type === "slot") {
        const placed = placements[seg.slotId];
        if (placed === seg.correctAnswerId) {
          results[seg.slotId] = "correct";
        } else {
          results[seg.slotId] = "incorrect";
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
  }, [segments, placements, onComplete]);

  const resetPuzzle = useCallback(() => {
    setPlacements({});
    setSelectedBlockId(null);
    setDragOverSlotId(null);
    setValidationResults(null);
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
  }, []);

  // --- Drag & Drop (HTML5) ---

  const handleDragStart = useCallback(
    (e: React.DragEvent, blockId: string) => {
      e.dataTransfer.setData("text/plain", blockId);
      e.dataTransfer.effectAllowed = "move";
    },
    []
  );

  const handleSlotDragOver = useCallback(
    (e: React.DragEvent, slotId: string) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverSlotId(slotId);
    },
    []
  );

  const handleSlotDragLeave = useCallback(() => {
    setDragOverSlotId(null);
  }, []);

  const handleSlotDrop = useCallback(
    (e: React.DragEvent, slotId: string) => {
      e.preventDefault();
      const blockId = e.dataTransfer.getData("text/plain");
      if (blockId) {
        placeBlock(slotId, blockId);
      }
      setDragOverSlotId(null);
    },
    [placeBlock]
  );

  // --- Touch Drag ---

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, blockId: string) => {
      const touch = e.touches[0];
      if (!touch) return;

      setTouchDragBlockId(blockId);

      const ghost = document.createElement("div");
      ghost.className =
        "fixed pointer-events-none z-50 px-4 py-2 rounded-xl border-2 border-accent bg-card text-sm font-semibold shadow-lg opacity-90 scale-105";
      ghost.textContent = getBlockContent(answerBlocks, blockId) ?? "";
      ghost.style.left = `${touch.clientX - 60}px`;
      ghost.style.top = `${touch.clientY - 24}px`;
      document.body.appendChild(ghost);
      ghostRef.current = ghost;
    },
    [answerBlocks]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchDragBlockId) return;
      e.preventDefault();
      const touch = e.touches[0];
      if (!touch || !ghostRef.current) return;

      ghostRef.current.style.left = `${touch.clientX - 60}px`;
      ghostRef.current.style.top = `${touch.clientY - 24}px`;

      // Find element under touch
      ghostRef.current.style.display = "none";
      const el = document.elementFromPoint(touch.clientX, touch.clientY);
      ghostRef.current.style.display = "";

      const slotEl = el?.closest("[data-slot-id]");
      setDragOverSlotId(
        slotEl ? slotEl.getAttribute("data-slot-id") : null
      );
    },
    [touchDragBlockId]
  );

  const handleTouchEnd = useCallback(() => {
    if (ghostRef.current) {
      document.body.removeChild(ghostRef.current);
      ghostRef.current = null;
    }

    if (touchDragBlockId && dragOverSlotId) {
      placeBlock(dragOverSlotId, touchDragBlockId);
    }

    setTouchDragBlockId(null);
    setDragOverSlotId(null);
  }, [touchDragBlockId, dragOverSlotId, placeBlock]);

  // --- Click-to-Place ---

  const handleBlockClick = useCallback(
    (blockId: string) => {
      if (isComplete) return;
      setSelectedBlockId((prev) => (prev === blockId ? null : blockId));
    },
    [isComplete]
  );

  const handleSlotClick = useCallback(
    (slotId: string) => {
      if (isComplete) return;

      // If a block is selected, place it
      if (selectedBlockId) {
        placeBlock(slotId, selectedBlockId);
        return;
      }

      // If slot has a block, remove it
      if (placements[slotId]) {
        removeBlock(slotId);
      }
    },
    [isComplete, selectedBlockId, placements, placeBlock, removeBlock]
  );

  // --- Render ---

  const renderSlot = (seg: Extract<FillBlanksSegment, { type: "slot" }>) => {
    const placedBlockId = placements[seg.slotId];
    const content = placedBlockId
      ? getBlockContent(answerBlocks, placedBlockId)
      : null;
    const validation = validationResults?.[seg.slotId];
    const isDragOver = dragOverSlotId === seg.slotId;

    return (
      <button
        key={seg.slotId}
        data-slot-id={seg.slotId}
        onClick={() => handleSlotClick(seg.slotId)}
        onDragOver={(e) => handleSlotDragOver(e, seg.slotId)}
        onDragLeave={handleSlotDragLeave}
        onDrop={(e) => handleSlotDrop(e, seg.slotId)}
        className={cn(
          "inline-flex items-center min-w-[100px] min-h-[36px] px-3 mx-1 my-1 rounded-xl border-2 transition-all duration-150 text-sm font-semibold",
          content
            ? // Filled slot
              cn(
                "border-accent/50 bg-accent/10 cursor-pointer",
                validation === "correct" &&
                  "border-primary bg-primary/20 text-primary",
                validation === "incorrect" &&
                  "border-destructive bg-destructive/20 text-destructive"
              )
            : // Empty slot
              cn(
                "border-dashed border-muted-foreground/50 bg-muted/50 text-muted-foreground",
                isDragOver && "border-accent bg-accent/20 scale-105",
                selectedBlockId && "border-accent/50 animate-pulse"
              )
        )}
      >
        {content ?? "___"}
      </button>
    );
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

      <CardContent className="space-y-5">
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
              : "Some answers are incorrect — try again!"}
          </div>
        )}

        {/* Text with blanks */}
        <div className="rounded-2xl border-2 border-border bg-card p-6">
          <p className="text-lg leading-relaxed text-foreground">
            {segments.map((seg, i) =>
              seg.type === "text" ? (
                <span key={i}>{seg.content}</span>
              ) : (
                renderSlot(seg)
              )
            )}
          </p>
        </div>

        {/* Answer blocks pool */}
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            {availableBlocks.length > 0
              ? "Drag or click to place:"
              : "All blanks filled"}
          </p>
          <div
            className="flex flex-wrap gap-3 min-h-[48px] items-center"
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {availableBlocks.map((block) => (
              <button
                key={block.id}
                draggable={!isComplete}
                onDragStart={(e) => handleDragStart(e, block.id)}
                onTouchStart={(e) => handleTouchStart(e, block.id)}
                onClick={() => handleBlockClick(block.id)}
                className={cn(
                  "inline-flex items-center px-4 py-2 rounded-xl border-2 border-border bg-card text-sm font-semibold",
                  "shadow-3d cursor-grab active:cursor-grabbing active:translate-y-1 active:shadow-none",
                  "transition-all duration-150 select-none",
                  "hover:brightness-105 hover:border-accent/50",
                  selectedBlockId === block.id &&
                    "ring-2 ring-accent border-accent",
                  isComplete && "pointer-events-none opacity-50"
                )}
              >
                {block.content}
              </button>
            ))}
          </div>
        </div>

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
              onClick={checkAnswers}
              disabled={!allSlotsFilled}
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

// Note: Fill-blanks content is stored in the database.
// Use the API to fetch puzzles: GET /applets?type=fill-blanks

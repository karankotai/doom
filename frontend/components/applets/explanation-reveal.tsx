"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ExplanationRevealProps {
  explanation: string;
}

/**
 * A collapsible "Why?" button that reveals the reasoning/explanation behind
 * an applet answer. Rendered by lesson pages after a puzzle is completed.
 */
export function ExplanationReveal({ explanation }: ExplanationRevealProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!isOpen ? (
        <Button
          variant="ghost"
          size="sm"
          className="w-full gap-2 text-accent hover:text-accent hover:bg-accent/10 font-bold"
          onClick={() => setIsOpen(true)}
        >
          <span className="text-base">💡</span>
          Why this answer?
        </Button>
      ) : (
        <div
          className={cn(
            "rounded-2xl border-2 border-accent/20 bg-accent/5 p-4 animate-pop"
          )}
        >
          <div className="flex items-start gap-3">
            <span className="text-xl shrink-0 mt-0.5">💡</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-accent mb-1">Explanation</p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {explanation}
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-3">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground"
              onClick={() => setIsOpen(false)}
            >
              Hide
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COUNTRIES } from "./map-data";

// --- Types ---

export interface MapRegion {
  id: string;     // country code matching CountryShape.id
  label?: string;  // optional display override
}

export interface MapSelectContent {
  regions: MapRegion[];       // which regions to display as selectable
  correctRegionIds: string[]; // IDs of the correct answer regions
  mapView?: {                 // optional: zoom into a specific area
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

interface MapSelectProps {
  question: string;
  hint?: string;
  regions: MapRegion[];
  correctRegionIds: string[];
  mapView?: { x: number; y: number; width: number; height: number };
  onComplete?: (success: boolean) => void;
}

// --- Constants ---

const LAND_COLOR = "#E8E8E8";
const BORDER_COLOR = "#A0A0A0";
const SELECTED_COLOR = "#1CB0F6";
const SELECTED_BORDER = "#0D8ECF";
const CORRECT_COLOR = "#58CC02";
const INCORRECT_COLOR = "#FF4B4B";
const MISSED_COLOR = "#FFC800";
const HOVER_COLOR = "#D0D0D0";

// Default viewBox: crops empty southern ocean while keeping all land with padding
// Land spans y≈18 (north) to y≈405 (south). We add padding above and below.
const DEFAULT_VIEWBOX = "0 0 1000 450";

// --- Component ---

export function MapSelect({
  question,
  hint,
  regions,
  correctRegionIds,
  mapView,
  onComplete,
}: MapSelectProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [validationResults, setValidationResults] = useState<Record<
    string,
    "correct" | "incorrect" | "missed"
  > | null>(null);

  // Map region ID -> label override
  const labelMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const r of regions) {
      if (r.label) m.set(r.id, r.label);
    }
    return m;
  }, [regions]);

  // Determine the viewBox
  const viewBox = mapView
    ? `${mapView.x} ${mapView.y} ${mapView.width} ${mapView.height}`
    : DEFAULT_VIEWBOX;

  // --- Actions ---

  const toggleCountry = useCallback(
    (countryId: string) => {
      if (isComplete) return;
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(countryId)) {
          next.delete(countryId);
        } else {
          next.add(countryId);
        }
        return next;
      });
      setFeedback(null);
      setValidationResults(null);
    },
    [isComplete]
  );

  const checkAnswer = useCallback(() => {
    const correctSet = new Set(correctRegionIds);
    const results: Record<string, "correct" | "incorrect" | "missed"> = {};

    for (const id of selected) {
      results[id] = correctSet.has(id) ? "correct" : "incorrect";
    }

    for (const id of correctRegionIds) {
      if (!selected.has(id)) {
        results[id] = "missed";
      }
    }

    setValidationResults(results);

    const allCorrect =
      selected.size === correctSet.size &&
      [...selected].every((id) => correctSet.has(id));

    if (allCorrect) {
      setFeedback("correct");
      setIsComplete(true);
      onComplete?.(true);
    } else {
      setFeedback("incorrect");
    }
  }, [selected, correctRegionIds, onComplete]);

  const resetPuzzle = useCallback(() => {
    setSelected(new Set());
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
    setValidationResults(null);
  }, []);

  // --- Get fill/stroke for any country ---
  const getCountryFill = (countryId: string) => {
    const validation = validationResults?.[countryId];
    if (validation === "correct") return CORRECT_COLOR;
    if (validation === "incorrect") return INCORRECT_COLOR;
    if (validation === "missed") return MISSED_COLOR;
    if (selected.has(countryId)) return SELECTED_COLOR;
    if (hoveredId === countryId) return HOVER_COLOR;
    return LAND_COLOR;
  };

  const getCountryStroke = (countryId: string) => {
    const validation = validationResults?.[countryId];
    if (validation) return "#ffffff";
    if (selected.has(countryId)) return SELECTED_BORDER;
    return BORDER_COLOR;
  };

  const getStrokeWidth = (countryId: string) => {
    if (selected.has(countryId) || validationResults?.[countryId]) return "1.2";
    return "0.5";
  };

  // Count selected & expected
  const selectedCount = selected.size;
  const expectedCount = correctRegionIds.length;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl sm:text-2xl">{question}</CardTitle>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mt-1">
          Select {expectedCount} {expectedCount === 1 ? "country" : "countries"} on the map
        </p>
        {hint && showHint && (
          <p className="text-sm text-muted-foreground mt-2 animate-pop">
            {hint}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
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
              : "Not quite — check the highlighted countries and try again!"}
          </div>
        )}

        {/* Map */}
        <div className="rounded-2xl border-2 border-border bg-[#AADAF2] overflow-hidden relative p-2 sm:p-3">
          <svg
            viewBox={viewBox}
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Ocean background — covers full projection area */}
            <rect x="0" y="0" width="1000" height="500" fill="#AADAF2" />

            {/* Equator and Tropics reference lines */}
            <line x1="0" y1="250" x2="1000" y2="250" stroke="#90C8E0" strokeWidth="0.5" strokeDasharray="4,4" />
            <line x1="0" y1="185" x2="1000" y2="185" stroke="#90C8E0" strokeWidth="0.3" strokeDasharray="2,4" />
            <line x1="0" y1="315" x2="1000" y2="315" stroke="#90C8E0" strokeWidth="0.3" strokeDasharray="2,4" />

            {/* All countries — every country is clickable */}
            {COUNTRIES.map((country) => (
              <path
                key={country.id}
                d={country.path}
                fill={getCountryFill(country.id)}
                stroke={getCountryStroke(country.id)}
                strokeWidth={getStrokeWidth(country.id)}
                strokeLinejoin="round"
                className={cn(
                  "transition-colors duration-150",
                  !isComplete && "cursor-pointer"
                )}
                onClick={() => toggleCountry(country.id)}
                onMouseEnter={() => setHoveredId(country.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <title>{labelMap.get(country.id) ?? country.name}</title>
              </path>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 justify-center text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: SELECTED_COLOR, border: `1px solid ${SELECTED_BORDER}` }} />
            <span className="text-muted-foreground">Selected</span>
          </div>
          {validationResults && (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm border border-white" style={{ backgroundColor: CORRECT_COLOR }} />
                <span className="text-muted-foreground">Correct</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm border border-white" style={{ backgroundColor: INCORRECT_COLOR }} />
                <span className="text-muted-foreground">Wrong</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm border border-white" style={{ backgroundColor: MISSED_COLOR }} />
                <span className="text-muted-foreground">Missed</span>
              </div>
            </>
          )}
        </div>

        {/* Selected countries list */}
        {selectedCount > 0 && (
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground text-center">
              Selected ({selectedCount}/{expectedCount}):
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {[...selected].map((id) => {
                const country = COUNTRIES.find((c) => c.id === id);
                const validation = validationResults?.[id];
                return (
                  <button
                    key={id}
                    onClick={() => toggleCountry(id)}
                    disabled={isComplete}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all",
                      validation === "correct"
                        ? "border-primary bg-primary/10 text-primary"
                        : validation === "incorrect"
                        ? "border-destructive bg-destructive/10 text-destructive"
                        : "border-accent bg-accent/10 text-accent-foreground hover:bg-destructive/10 hover:border-destructive/50",
                      isComplete && "pointer-events-none"
                    )}
                  >
                    <span>{labelMap.get(id) ?? country?.name ?? id}</span>
                    {!isComplete && <span className="text-muted-foreground">×</span>}
                  </button>
                );
              })}
            </div>
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
              disabled={selectedCount === 0}
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

"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types ---

export interface ChartDataPoint {
  id: string;
  label: string;
  value: number;
  /** Optional second value for scatter plots (x=value, y=value2) */
  value2?: number;
  color?: string;
}

export interface ChartReadingContent {
  chartType: "bar" | "pie" | "line" | "scatter" | "histogram";
  chartTitle: string;
  data: ChartDataPoint[];
  /** Axis labels */
  xAxisLabel?: string;
  yAxisLabel?: string;
  /** How many items the user must select */
  selectCount: number;
  /** The correct data point IDs */
  correctIds: string[];
  /** Unit for values (e.g., "cafes", "%", "million") */
  unit?: string;
}

interface ChartReadingProps {
  question: string;
  hint?: string;
  chartType: "bar" | "pie" | "line" | "scatter" | "histogram";
  chartTitle: string;
  data: ChartDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  selectCount: number;
  correctIds: string[];
  unit?: string;
  onComplete?: (success: boolean) => void;
}

// --- Color palette ---

const PALETTE = [
  "#C8B6E2", // lavender
  "#F5C6D0", // pink
  "#B5D8F7", // light blue
  "#C5E8B7", // light green
  "#F7E2B3", // light yellow
  "#F0B5B5", // salmon
  "#B5E8E3", // teal
];

const SELECTED_COLOR = "#6B3FA0";
const CORRECT_COLOR = "#58CC02";
const INCORRECT_COLOR = "#FF4B4B";
const GRID_COLOR = "#E5E7EB";
const AXIS_COLOR = "#6B7280";
const TEXT_COLOR = "#1F2937";

// --- SVG dimensions ---
const SVG_W = 500;
const SVG_H = 340;
const MARGIN = { top: 30, right: 20, bottom: 50, left: 55 };
const CHART_W = SVG_W - MARGIN.left - MARGIN.right;
const CHART_H = SVG_H - MARGIN.top - MARGIN.bottom;

// --- Helpers ---

function niceMax(val: number): number {
  const magnitude = Math.pow(10, Math.floor(Math.log10(val)));
  const normalized = val / magnitude;
  if (normalized <= 1) return magnitude;
  if (normalized <= 2) return 2 * magnitude;
  if (normalized <= 5) return 5 * magnitude;
  return 10 * magnitude;
}

function generateTicks(maxVal: number, count: number = 6): number[] {
  const nice = niceMax(maxVal);
  const step = nice / count;
  const ticks: number[] = [];
  for (let i = 0; i <= count; i++) {
    ticks.push(Math.round(step * i));
  }
  return ticks;
}

// --- Component ---

export function ChartReading({
  question,
  hint,
  chartType,
  chartTitle,
  data,
  xAxisLabel,
  yAxisLabel,
  selectCount,
  correctIds,
  unit,
  onComplete,
}: ChartReadingProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [validationResults, setValidationResults] = useState<Record<string, "correct" | "incorrect"> | null>(null);

  const correctSet = useMemo(() => new Set(correctIds), [correctIds]);

  const toggleSelect = useCallback(
    (id: string) => {
      if (isComplete) return;
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          if (next.size >= selectCount) {
            // Remove oldest selection to make room
            const firstKey = next.values().next().value;
            if (firstKey !== undefined) next.delete(firstKey);
          }
          next.add(id);
        }
        return next;
      });
      setFeedback(null);
      setValidationResults(null);
    },
    [isComplete, selectCount]
  );

  const checkAnswer = useCallback(() => {
    if (selected.size !== selectCount) return;

    const results: Record<string, "correct" | "incorrect"> = {};
    let allCorrect = true;

    for (const id of selected) {
      if (correctSet.has(id)) {
        results[id] = "correct";
      } else {
        results[id] = "incorrect";
        allCorrect = false;
      }
    }
    // Check we have all correct ones
    for (const id of correctIds) {
      if (!selected.has(id)) {
        allCorrect = false;
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
  }, [selected, selectCount, correctSet, correctIds, onComplete]);

  const resetPuzzle = useCallback(() => {
    setSelected(new Set());
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
    setValidationResults(null);
  }, []);

  // Compute bar fill color
  const getBarFill = (id: string, index: number): string => {
    if (validationResults?.[id] === "correct") return CORRECT_COLOR;
    if (validationResults?.[id] === "incorrect") return INCORRECT_COLOR;
    if (selected.has(id)) return SELECTED_COLOR;
    if (hoveredId === id && !isComplete) return SELECTED_COLOR + "80";
    return data[index]?.color ?? PALETTE[index % PALETTE.length] ?? PALETTE[0]!;
  };

  // --- Max values for axes ---
  const maxValue = useMemo(() => Math.max(...data.map((d) => d.value)), [data]);
  const maxValue2 = useMemo(() => Math.max(...data.map((d) => d.value2 ?? 0)), [data]);

  // --- Render chart based on type ---

  const renderBarChart = () => {
    const ticks = generateTicks(maxValue);
    const yMax = ticks[ticks.length - 1] ?? maxValue;
    const barWidth = Math.min(CHART_W / data.length * 0.6, 60);
    const barGap = CHART_W / data.length;

    return (
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ maxHeight: "400px" }}>
        {/* Grid lines */}
        {ticks.map((tick) => {
          const y = MARGIN.top + CHART_H - (tick / yMax) * CHART_H;
          return (
            <g key={tick}>
              <line x1={MARGIN.left} y1={y} x2={SVG_W - MARGIN.right} y2={y} stroke={GRID_COLOR} strokeWidth={1} />
              <text x={MARGIN.left - 8} y={y + 4} textAnchor="end" fontSize={11} fill={AXIS_COLOR}>
                {tick}
              </text>
            </g>
          );
        })}

        {/* Y axis label */}
        {yAxisLabel && (
          <text
            x={14}
            y={MARGIN.top + CHART_H / 2}
            textAnchor="middle"
            fontSize={11}
            fill={AXIS_COLOR}
            transform={`rotate(-90, 14, ${MARGIN.top + CHART_H / 2})`}
          >
            {yAxisLabel}
          </text>
        )}

        {/* Bars */}
        {data.map((d, i) => {
          const barHeight = (d.value / yMax) * CHART_H;
          const x = MARGIN.left + i * barGap + (barGap - barWidth) / 2;
          const y = MARGIN.top + CHART_H - barHeight;
          const isSelected = selected.has(d.id);
          const isHovered = hoveredId === d.id;
          const fill = getBarFill(d.id, i);

          return (
            <g
              key={d.id}
              onClick={() => toggleSelect(d.id)}
              onMouseEnter={() => setHoveredId(d.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: isComplete ? "default" : "pointer" }}
            >
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={fill}
                rx={3}
                stroke={isSelected || isHovered ? SELECTED_COLOR : "none"}
                strokeWidth={isSelected ? 2.5 : isHovered ? 1.5 : 0}
                className="transition-all duration-150"
              />
              {/* Validation checkmark / X */}
              {validationResults?.[d.id] === "correct" && (
                <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize={16} fill={CORRECT_COLOR}>
                  &#10003;
                </text>
              )}
              {validationResults?.[d.id] === "incorrect" && (
                <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize={16} fill={INCORRECT_COLOR}>
                  &#10007;
                </text>
              )}
              {/* Hover tooltip - value */}
              {(isHovered || isSelected) && !validationResults && (
                <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize={11} fontWeight="bold" fill={TEXT_COLOR}>
                  {d.value}{unit ? ` ${unit}` : ""}
                </text>
              )}
              {/* Label */}
              <text
                x={x + barWidth / 2}
                y={MARGIN.top + CHART_H + 18}
                textAnchor="middle"
                fontSize={12}
                fontWeight={isSelected ? "bold" : "normal"}
                fill={isSelected ? SELECTED_COLOR : TEXT_COLOR}
              >
                {d.label}
              </text>
            </g>
          );
        })}

        {/* X axis label */}
        {xAxisLabel && (
          <text x={MARGIN.left + CHART_W / 2} y={SVG_H - 4} textAnchor="middle" fontSize={11} fill={AXIS_COLOR}>
            {xAxisLabel}
          </text>
        )}

        {/* Axis lines */}
        <line x1={MARGIN.left} y1={MARGIN.top} x2={MARGIN.left} y2={MARGIN.top + CHART_H} stroke={AXIS_COLOR} strokeWidth={1.5} />
        <line x1={MARGIN.left} y1={MARGIN.top + CHART_H} x2={SVG_W - MARGIN.right} y2={MARGIN.top + CHART_H} stroke={AXIS_COLOR} strokeWidth={1.5} />
      </svg>
    );
  };

  const renderPieChart = () => {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const cx = SVG_W / 2;
    const cy = (SVG_H - 20) / 2 + 10;
    const r = Math.min(cx, cy) - 40;
    let currentAngle = -90;

    return (
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ maxHeight: "400px" }}>
        {data.map((d, i) => {
          const sliceAngle = (d.value / total) * 360;
          const startAngle = currentAngle;
          const endAngle = currentAngle + sliceAngle;
          currentAngle = endAngle;

          const startRad = (startAngle * Math.PI) / 180;
          const endRad = (endAngle * Math.PI) / 180;
          const x1 = cx + r * Math.cos(startRad);
          const y1 = cy + r * Math.sin(startRad);
          const x2 = cx + r * Math.cos(endRad);
          const y2 = cy + r * Math.sin(endRad);
          const largeArc = sliceAngle > 180 ? 1 : 0;
          const path = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;

          // Label position at midpoint of arc
          const midAngle = ((startAngle + endAngle) / 2) * Math.PI / 180;
          const labelR = r * 0.65;
          const lx = cx + labelR * Math.cos(midAngle);
          const ly = cy + labelR * Math.sin(midAngle);

          const isSelected = selected.has(d.id);
          const isHovered = hoveredId === d.id;
          const fill = getBarFill(d.id, i);

          // Pull out selected slice slightly
          const pullDist = isSelected ? 6 : 0;
          const pullX = pullDist * Math.cos(midAngle);
          const pullY = pullDist * Math.sin(midAngle);

          return (
            <g
              key={d.id}
              onClick={() => toggleSelect(d.id)}
              onMouseEnter={() => setHoveredId(d.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: isComplete ? "default" : "pointer" }}
              transform={`translate(${pullX}, ${pullY})`}
            >
              <path
                d={path}
                fill={fill}
                stroke="white"
                strokeWidth={2}
                className="transition-all duration-150"
              />
              {/* Label */}
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={sliceAngle > 25 ? 11 : 9}
                fontWeight={isSelected || isHovered ? "bold" : "normal"}
                fill={isSelected ? "white" : TEXT_COLOR}
              >
                {d.label}
              </text>
              {sliceAngle > 20 && (
                <text
                  x={lx}
                  y={ly + 14}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={10}
                  fill={isSelected ? "white" : AXIS_COLOR}
                >
                  {Math.round((d.value / total) * 100)}%
                </text>
              )}
              {/* Validation */}
              {validationResults?.[d.id] === "correct" && (
                <text x={lx} y={ly - 12} textAnchor="middle" fontSize={16} fill={CORRECT_COLOR}>&#10003;</text>
              )}
              {validationResults?.[d.id] === "incorrect" && (
                <text x={lx} y={ly - 12} textAnchor="middle" fontSize={16} fill={INCORRECT_COLOR}>&#10007;</text>
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  const renderLineChart = () => {
    const ticks = generateTicks(maxValue);
    const yMax = ticks[ticks.length - 1] ?? maxValue;
    const xStep = CHART_W / (data.length - 1 || 1);

    const points = data.map((d, i) => ({
      x: MARGIN.left + i * xStep,
      y: MARGIN.top + CHART_H - (d.value / yMax) * CHART_H,
      d,
      i,
    }));

    const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

    return (
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ maxHeight: "400px" }}>
        {/* Grid */}
        {ticks.map((tick) => {
          const y = MARGIN.top + CHART_H - (tick / yMax) * CHART_H;
          return (
            <g key={tick}>
              <line x1={MARGIN.left} y1={y} x2={SVG_W - MARGIN.right} y2={y} stroke={GRID_COLOR} strokeWidth={1} />
              <text x={MARGIN.left - 8} y={y + 4} textAnchor="end" fontSize={11} fill={AXIS_COLOR}>{tick}</text>
            </g>
          );
        })}

        {/* Line */}
        <path d={linePath} fill="none" stroke={PALETTE[0]} strokeWidth={2.5} strokeLinejoin="round" />

        {/* Points */}
        {points.map(({ x, y, d, i }) => {
          const isSelected = selected.has(d.id);
          const isHovered = hoveredId === d.id;
          const fill = getBarFill(d.id, i);

          return (
            <g
              key={d.id}
              onClick={() => toggleSelect(d.id)}
              onMouseEnter={() => setHoveredId(d.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: isComplete ? "default" : "pointer" }}
            >
              <circle cx={x} cy={y} r={isSelected || isHovered ? 8 : 6} fill={fill} stroke="white" strokeWidth={2} className="transition-all duration-150" />
              {(isHovered || isSelected) && !validationResults && (
                <text x={x} y={y - 14} textAnchor="middle" fontSize={11} fontWeight="bold" fill={TEXT_COLOR}>
                  {d.value}{unit ? ` ${unit}` : ""}
                </text>
              )}
              {validationResults?.[d.id] === "correct" && (
                <text x={x} y={y - 14} textAnchor="middle" fontSize={16} fill={CORRECT_COLOR}>&#10003;</text>
              )}
              {validationResults?.[d.id] === "incorrect" && (
                <text x={x} y={y - 14} textAnchor="middle" fontSize={16} fill={INCORRECT_COLOR}>&#10007;</text>
              )}
              {/* X label */}
              <text x={x} y={MARGIN.top + CHART_H + 18} textAnchor="middle" fontSize={11} fontWeight={isSelected ? "bold" : "normal"} fill={isSelected ? SELECTED_COLOR : TEXT_COLOR}>
                {d.label}
              </text>
            </g>
          );
        })}

        {yAxisLabel && (
          <text x={14} y={MARGIN.top + CHART_H / 2} textAnchor="middle" fontSize={11} fill={AXIS_COLOR} transform={`rotate(-90, 14, ${MARGIN.top + CHART_H / 2})`}>
            {yAxisLabel}
          </text>
        )}
        {xAxisLabel && (
          <text x={MARGIN.left + CHART_W / 2} y={SVG_H - 4} textAnchor="middle" fontSize={11} fill={AXIS_COLOR}>{xAxisLabel}</text>
        )}

        <line x1={MARGIN.left} y1={MARGIN.top} x2={MARGIN.left} y2={MARGIN.top + CHART_H} stroke={AXIS_COLOR} strokeWidth={1.5} />
        <line x1={MARGIN.left} y1={MARGIN.top + CHART_H} x2={SVG_W - MARGIN.right} y2={MARGIN.top + CHART_H} stroke={AXIS_COLOR} strokeWidth={1.5} />
      </svg>
    );
  };

  const renderScatterPlot = () => {
    const xTicks = generateTicks(maxValue);
    const yTicks = generateTicks(maxValue2);
    const xMax = xTicks[xTicks.length - 1] ?? maxValue;
    const yMax = yTicks[yTicks.length - 1] ?? maxValue2;

    return (
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ maxHeight: "400px" }}>
        {/* Y grid */}
        {yTicks.map((tick) => {
          const y = MARGIN.top + CHART_H - (tick / yMax) * CHART_H;
          return (
            <g key={`y-${tick}`}>
              <line x1={MARGIN.left} y1={y} x2={SVG_W - MARGIN.right} y2={y} stroke={GRID_COLOR} strokeWidth={1} />
              <text x={MARGIN.left - 8} y={y + 4} textAnchor="end" fontSize={10} fill={AXIS_COLOR}>{tick}</text>
            </g>
          );
        })}
        {/* X grid */}
        {xTicks.map((tick) => {
          const x = MARGIN.left + (tick / xMax) * CHART_W;
          return (
            <g key={`x-${tick}`}>
              <line x1={x} y1={MARGIN.top} x2={x} y2={MARGIN.top + CHART_H} stroke={GRID_COLOR} strokeWidth={1} />
              <text x={x} y={MARGIN.top + CHART_H + 16} textAnchor="middle" fontSize={10} fill={AXIS_COLOR}>{tick}</text>
            </g>
          );
        })}

        {/* Points */}
        {data.map((d, i) => {
          const x = MARGIN.left + (d.value / xMax) * CHART_W;
          const y = MARGIN.top + CHART_H - ((d.value2 ?? 0) / yMax) * CHART_H;
          const isSelected = selected.has(d.id);
          const isHovered = hoveredId === d.id;
          const fill = getBarFill(d.id, i);

          return (
            <g
              key={d.id}
              onClick={() => toggleSelect(d.id)}
              onMouseEnter={() => setHoveredId(d.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: isComplete ? "default" : "pointer" }}
            >
              <circle cx={x} cy={y} r={isSelected || isHovered ? 9 : 6} fill={fill} stroke="white" strokeWidth={2} className="transition-all duration-150" />
              {/* Label */}
              <text x={x + 10} y={y - 4} fontSize={10} fontWeight={isSelected ? "bold" : "normal"} fill={isSelected ? SELECTED_COLOR : TEXT_COLOR}>
                {d.label}
              </text>
              {validationResults?.[d.id] === "correct" && (
                <text x={x} y={y - 14} textAnchor="middle" fontSize={16} fill={CORRECT_COLOR}>&#10003;</text>
              )}
              {validationResults?.[d.id] === "incorrect" && (
                <text x={x} y={y - 14} textAnchor="middle" fontSize={16} fill={INCORRECT_COLOR}>&#10007;</text>
              )}
            </g>
          );
        })}

        {yAxisLabel && (
          <text x={14} y={MARGIN.top + CHART_H / 2} textAnchor="middle" fontSize={11} fill={AXIS_COLOR} transform={`rotate(-90, 14, ${MARGIN.top + CHART_H / 2})`}>
            {yAxisLabel}
          </text>
        )}
        {xAxisLabel && (
          <text x={MARGIN.left + CHART_W / 2} y={SVG_H - 4} textAnchor="middle" fontSize={11} fill={AXIS_COLOR}>{xAxisLabel}</text>
        )}

        <line x1={MARGIN.left} y1={MARGIN.top} x2={MARGIN.left} y2={MARGIN.top + CHART_H} stroke={AXIS_COLOR} strokeWidth={1.5} />
        <line x1={MARGIN.left} y1={MARGIN.top + CHART_H} x2={SVG_W - MARGIN.right} y2={MARGIN.top + CHART_H} stroke={AXIS_COLOR} strokeWidth={1.5} />
      </svg>
    );
  };

  const renderHistogram = () => {
    const ticks = generateTicks(maxValue);
    const yMax = ticks[ticks.length - 1] ?? maxValue;
    const barWidth = CHART_W / data.length;

    return (
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ maxHeight: "400px" }}>
        {/* Grid */}
        {ticks.map((tick) => {
          const y = MARGIN.top + CHART_H - (tick / yMax) * CHART_H;
          return (
            <g key={tick}>
              <line x1={MARGIN.left} y1={y} x2={SVG_W - MARGIN.right} y2={y} stroke={GRID_COLOR} strokeWidth={1} />
              <text x={MARGIN.left - 8} y={y + 4} textAnchor="end" fontSize={11} fill={AXIS_COLOR}>{tick}</text>
            </g>
          );
        })}

        {/* Bars — no gap for histogram */}
        {data.map((d, i) => {
          const barHeight = (d.value / yMax) * CHART_H;
          const x = MARGIN.left + i * barWidth;
          const y = MARGIN.top + CHART_H - barHeight;
          const isSelected = selected.has(d.id);
          const isHovered = hoveredId === d.id;
          const fill = getBarFill(d.id, i);

          return (
            <g
              key={d.id}
              onClick={() => toggleSelect(d.id)}
              onMouseEnter={() => setHoveredId(d.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: isComplete ? "default" : "pointer" }}
            >
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={fill}
                stroke="white"
                strokeWidth={1}
                className="transition-all duration-150"
              />
              {(isHovered || isSelected) && !validationResults && (
                <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize={11} fontWeight="bold" fill={TEXT_COLOR}>
                  {d.value}
                </text>
              )}
              {validationResults?.[d.id] === "correct" && (
                <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize={16} fill={CORRECT_COLOR}>&#10003;</text>
              )}
              {validationResults?.[d.id] === "incorrect" && (
                <text x={x + barWidth / 2} y={y - 6} textAnchor="middle" fontSize={16} fill={INCORRECT_COLOR}>&#10007;</text>
              )}
              <text
                x={x + barWidth / 2}
                y={MARGIN.top + CHART_H + 18}
                textAnchor="middle"
                fontSize={11}
                fontWeight={isSelected ? "bold" : "normal"}
                fill={isSelected ? SELECTED_COLOR : TEXT_COLOR}
              >
                {d.label}
              </text>
            </g>
          );
        })}

        {yAxisLabel && (
          <text x={14} y={MARGIN.top + CHART_H / 2} textAnchor="middle" fontSize={11} fill={AXIS_COLOR} transform={`rotate(-90, 14, ${MARGIN.top + CHART_H / 2})`}>
            {yAxisLabel}
          </text>
        )}
        {xAxisLabel && (
          <text x={MARGIN.left + CHART_W / 2} y={SVG_H - 4} textAnchor="middle" fontSize={11} fill={AXIS_COLOR}>{xAxisLabel}</text>
        )}

        <line x1={MARGIN.left} y1={MARGIN.top} x2={MARGIN.left} y2={MARGIN.top + CHART_H} stroke={AXIS_COLOR} strokeWidth={1.5} />
        <line x1={MARGIN.left} y1={MARGIN.top + CHART_H} x2={SVG_W - MARGIN.right} y2={MARGIN.top + CHART_H} stroke={AXIS_COLOR} strokeWidth={1.5} />
      </svg>
    );
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar": return renderBarChart();
      case "pie": return renderPieChart();
      case "line": return renderLineChart();
      case "scatter": return renderScatterPlot();
      case "histogram": return renderHistogram();
      default: return renderBarChart();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center pb-2">
        <p className="text-sm text-muted-foreground mb-1">{chartTitle}</p>
        <CardTitle className="text-xl sm:text-2xl">{question}</CardTitle>
        {hint && showHint && (
          <p className="text-sm text-muted-foreground mt-2 animate-pop">{hint}</p>
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
              ? "Correct! Great chart reading!"
              : "Not quite right — look at the chart more carefully!"}
          </div>
        )}

        {/* Selection indicator */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Select {selectCount} {selectCount === 1 ? "item" : "items"}
          </span>
          <div className="flex gap-1">
            {Array.from({ length: selectCount }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-3 h-3 rounded-full border-2 transition-all",
                  i < selected.size
                    ? "bg-accent border-accent"
                    : "bg-transparent border-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="px-2">
          {renderChart()}
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center pt-2">
          {!isComplete && hint && !showHint && (
            <Button variant="outline" size="sm" onClick={() => setShowHint(true)}>
              Show hint
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={resetPuzzle}>
            Start over
          </Button>
          {!isComplete && (
            <Button size="sm" onClick={checkAnswer} disabled={selected.size !== selectCount}>
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

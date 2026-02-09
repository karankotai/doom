"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// --- Types (match backend content structure) ---

export interface CircuitNode {
  id: string;
  type:
    | "battery"
    | "bulb"
    | "switch"
    | "ammeter"
    | "voltmeter"
    | "resistor"
    | "junction";
  x: number;
  y: number;
  label?: string;
  value?: number;
}

export interface CircuitWire {
  id: string;
  from: string;
  to: string;
  waypoints?: { x: number; y: number }[];
}

interface CircuitBuilderProps {
  question: string;
  hint?: string;
  nodes: CircuitNode[];
  wires: CircuitWire[];
  correctSwitchStates: Record<string, boolean>;
  onComplete?: (success: boolean) => void;
}

// --- Colors (Cosmos theme) ---

const WIRE_COLOR = "#6B6D87";
const WIRE_ACTIVE_COLOR = "#6C63FF";
const BULB_ON_COLOR = "#FFD700";
const BULB_OFF_COLOR = "#D6D2E4";
const SWITCH_ON_COLOR = "#00C2D4";
const SWITCH_OFF_COLOR = "#9CA3AF";
const BATTERY_BODY = "#4B5563";
const BATTERY_CAP = "#F59E0B";
const COMPONENT_STROKE = "#1C1E30";

// --- Circuit Analysis ---

function computeLitBulbs(
  nodes: CircuitNode[],
  wires: CircuitWire[],
  switchStates: Record<string, boolean>
): Set<string> {
  // Build adjacency list, treating OFF switches as blocking
  const adjacency: Record<string, Set<string>> = {};
  for (const node of nodes) {
    adjacency[node.id] = new Set();
  }

  for (const wire of wires) {
    const fromNode = nodes.find((n) => n.id === wire.from);
    const toNode = nodes.find((n) => n.id === wire.to);
    if (!fromNode || !toNode) continue;

    // Wire is blocked if either endpoint is an OFF switch
    const fromBlocked =
      fromNode.type === "switch" && !switchStates[fromNode.id];
    const toBlocked = toNode.type === "switch" && !switchStates[toNode.id];
    if (fromBlocked || toBlocked) continue;

    adjacency[wire.from]?.add(wire.to);
    adjacency[wire.to]?.add(wire.from);
  }

  // Find battery
  const battery = nodes.find((n) => n.type === "battery");
  if (!battery) return new Set();

  // BFS from battery to find all reachable nodes
  const visited = new Set<string>();
  const queue: string[] = [battery.id];
  visited.add(battery.id);

  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const neighbor of adjacency[current] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  // Bulbs that are reachable from battery are lit
  const litBulbs = new Set<string>();
  for (const node of nodes) {
    if (node.type === "bulb" && visited.has(node.id)) {
      litBulbs.add(node.id);
    }
  }

  return litBulbs;
}

// Determine which wires are "active" (part of a powered path)
function computeActiveWires(
  nodes: CircuitNode[],
  wires: CircuitWire[],
  switchStates: Record<string, boolean>
): Set<string> {
  const adjacency: Record<string, Set<string>> = {};
  for (const node of nodes) {
    adjacency[node.id] = new Set();
  }

  const wireMap = new Map<string, CircuitWire>();
  for (const wire of wires) {
    wireMap.set(wire.id, wire);
    const fromNode = nodes.find((n) => n.id === wire.from);
    const toNode = nodes.find((n) => n.id === wire.to);
    if (!fromNode || !toNode) continue;
    const fromBlocked =
      fromNode.type === "switch" && !switchStates[fromNode.id];
    const toBlocked = toNode.type === "switch" && !switchStates[toNode.id];
    if (fromBlocked || toBlocked) continue;
    adjacency[wire.from]?.add(wire.to);
    adjacency[wire.to]?.add(wire.from);
  }

  const battery = nodes.find((n) => n.type === "battery");
  if (!battery) return new Set();

  const visited = new Set<string>();
  const queue: string[] = [battery.id];
  visited.add(battery.id);
  while (queue.length > 0) {
    const current = queue.shift()!;
    for (const neighbor of adjacency[current] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  const activeWires = new Set<string>();
  for (const wire of wires) {
    if (visited.has(wire.from) && visited.has(wire.to)) {
      const fromNode = nodes.find((n) => n.id === wire.from);
      const toNode = nodes.find((n) => n.id === wire.to);
      if (!fromNode || !toNode) continue;
      const fromBlocked =
        fromNode.type === "switch" && !switchStates[fromNode.id];
      const toBlocked = toNode.type === "switch" && !switchStates[toNode.id];
      if (!fromBlocked && !toBlocked) {
        activeWires.add(wire.id);
      }
    }
  }

  return activeWires;
}

// --- SVG Renderers ---

function renderBattery(node: CircuitNode) {
  const w = 44;
  const h = 28;
  return (
    <g key={node.id}>
      {/* Battery body */}
      <rect
        x={node.x - w / 2}
        y={node.y - h / 2}
        width={w}
        height={h}
        rx={4}
        fill={BATTERY_BODY}
        stroke={COMPONENT_STROKE}
        strokeWidth={1.5}
      />
      {/* Battery cap (positive terminal) */}
      <rect
        x={node.x + w / 2 - 1}
        y={node.y - 8}
        width={8}
        height={16}
        rx={2}
        fill={BATTERY_CAP}
        stroke={COMPONENT_STROKE}
        strokeWidth={1}
      />
      {/* + / - labels */}
      <text
        x={node.x + w / 2 + 14}
        y={node.y + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight="bold"
        fill={BATTERY_CAP}
      >
        +
      </text>
      <text
        x={node.x - w / 2 - 8}
        y={node.y + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight="bold"
        fill="#9CA3AF"
      >
        -
      </text>
      {node.label && (
        <text
          x={node.x}
          y={node.y + h / 2 + 16}
          textAnchor="middle"
          fontSize={10}
          fontWeight="600"
          fill="#6B6D87"
        >
          {node.label}
        </text>
      )}
    </g>
  );
}

function renderBulb(
  node: CircuitNode,
  isLit: boolean,
  validationState: "correct" | "incorrect" | null
) {
  return (
    <g key={node.id}>
      {/* Outer glow when lit */}
      {isLit && (
        <>
          <circle cx={node.x} cy={node.y} r={30} fill={BULB_ON_COLOR} opacity={0.12} />
          <circle cx={node.x} cy={node.y} r={24} fill={BULB_ON_COLOR} opacity={0.2} />
        </>
      )}
      {/* Validation border */}
      {validationState && (
        <rect
          x={node.x - 26}
          y={node.y - 26}
          width={52}
          height={52}
          rx={10}
          fill="none"
          stroke={validationState === "correct" ? "#22C55E" : "#FF3B5C"}
          strokeWidth={2.5}
        />
      )}
      {/* Checkmark for correct */}
      {validationState === "correct" && (
        <g transform={`translate(${node.x + 18}, ${node.y - 22})`}>
          <circle cx={0} cy={0} r={8} fill="#22C55E" />
          <path
            d="M-3.5 0 L-1 2.5 L3.5 -2"
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
      {/* Bulb base */}
      <rect
        x={node.x - 5}
        y={node.y + 14}
        width={10}
        height={6}
        rx={1}
        fill={isLit ? "#B8860B" : "#9CA3AF"}
      />
      {/* Bulb glass */}
      <circle
        cx={node.x}
        cy={node.y}
        r={18}
        fill={isLit ? BULB_ON_COLOR : BULB_OFF_COLOR}
        stroke={isLit ? "#DAA520" : "#9CA3AF"}
        strokeWidth={2}
        style={{ transition: "fill 0.4s ease, stroke 0.4s ease" }}
      />
      {/* Filament */}
      <path
        d={`M${node.x - 5} ${node.y + 6} Q${node.x - 3} ${node.y - 4} ${node.x} ${node.y - 8} Q${node.x + 3} ${node.y - 4} ${node.x + 5} ${node.y + 6}`}
        fill="none"
        stroke={isLit ? "#B8860B" : "#999"}
        strokeWidth={1.5}
      />
      {/* Inner filament lines */}
      <line
        x1={node.x - 5}
        y1={node.y + 6}
        x2={node.x - 5}
        y2={node.y + 12}
        stroke={isLit ? "#B8860B" : "#999"}
        strokeWidth={1.5}
      />
      <line
        x1={node.x + 5}
        y1={node.y + 6}
        x2={node.x + 5}
        y2={node.y + 12}
        stroke={isLit ? "#B8860B" : "#999"}
        strokeWidth={1.5}
      />
      {node.label && (
        <text
          x={node.x}
          y={node.y + 34}
          textAnchor="middle"
          fontSize={10}
          fontWeight="600"
          fill="#6B6D87"
        >
          {node.label}
        </text>
      )}
    </g>
  );
}

function renderSwitch(
  node: CircuitNode,
  isOn: boolean,
  isComplete: boolean,
  onToggle: (id: string) => void
) {
  return (
    <g
      key={node.id}
      onClick={() => !isComplete && onToggle(node.id)}
      style={{ cursor: isComplete ? "default" : "pointer" }}
      role="button"
      aria-label={`Switch ${node.label || node.id}: ${isOn ? "ON" : "OFF"}`}
    >
      {/* Hit area for easier clicking */}
      <rect
        x={node.x - 24}
        y={node.y - 20}
        width={48}
        height={40}
        fill="transparent"
      />
      {/* Contact point left */}
      <circle
        cx={node.x - 15}
        cy={node.y}
        r={4}
        fill={isOn ? SWITCH_ON_COLOR : SWITCH_OFF_COLOR}
        stroke={COMPONENT_STROKE}
        strokeWidth={1.5}
      />
      {/* Contact point right */}
      <circle
        cx={node.x + 15}
        cy={node.y}
        r={4}
        fill={isOn ? SWITCH_ON_COLOR : SWITCH_OFF_COLOR}
        stroke={COMPONENT_STROKE}
        strokeWidth={1.5}
      />
      {/* Switch arm */}
      <line
        x1={node.x - 15}
        y1={node.y}
        x2={isOn ? node.x + 15 : node.x + 8}
        y2={isOn ? node.y : node.y - 18}
        stroke={isOn ? SWITCH_ON_COLOR : SWITCH_OFF_COLOR}
        strokeWidth={3}
        strokeLinecap="round"
        style={{ transition: "all 0.3s ease" }}
      />
      {/* ON/OFF label */}
      <text
        x={node.x}
        y={node.y + 20}
        textAnchor="middle"
        fontSize={9}
        fontWeight="bold"
        fill={isOn ? SWITCH_ON_COLOR : "#9CA3AF"}
      >
        {isOn ? "ON" : "OFF"}
      </text>
      {node.label && (
        <text
          x={node.x}
          y={node.y - 24}
          textAnchor="middle"
          fontSize={10}
          fontWeight="600"
          fill="#6B6D87"
        >
          {node.label}
        </text>
      )}
    </g>
  );
}

function renderAmmeter(node: CircuitNode, isActive: boolean) {
  return (
    <g key={node.id}>
      <circle
        cx={node.x}
        cy={node.y}
        r={16}
        fill={isActive ? "#EFF6FF" : "#F9FAFB"}
        stroke={isActive ? "#3B82F6" : "#9CA3AF"}
        strokeWidth={2}
      />
      <text
        x={node.x}
        y={node.y + 5}
        textAnchor="middle"
        fontSize={14}
        fontWeight="bold"
        fill={isActive ? "#3B82F6" : "#9CA3AF"}
      >
        A
      </text>
      {node.label && (
        <text
          x={node.x}
          y={node.y + 30}
          textAnchor="middle"
          fontSize={10}
          fontWeight="600"
          fill="#6B6D87"
        >
          {node.label}
        </text>
      )}
    </g>
  );
}

function renderVoltmeter(node: CircuitNode, isActive: boolean) {
  return (
    <g key={node.id}>
      <circle
        cx={node.x}
        cy={node.y}
        r={16}
        fill={isActive ? "#FEF3C7" : "#F9FAFB"}
        stroke={isActive ? "#F59E0B" : "#9CA3AF"}
        strokeWidth={2}
      />
      <text
        x={node.x}
        y={node.y + 5}
        textAnchor="middle"
        fontSize={14}
        fontWeight="bold"
        fill={isActive ? "#F59E0B" : "#9CA3AF"}
      >
        V
      </text>
      {node.label && (
        <text
          x={node.x}
          y={node.y + 30}
          textAnchor="middle"
          fontSize={10}
          fontWeight="600"
          fill="#6B6D87"
        >
          {node.label}
        </text>
      )}
    </g>
  );
}

function renderResistor(node: CircuitNode) {
  // Zigzag pattern
  const zw = 6;
  const zh = 10;
  const segments = 4;
  const startX = node.x - segments * zw;
  let d = `M${startX} ${node.y}`;
  for (let i = 0; i < segments; i++) {
    const x = startX + i * zw * 2;
    d += ` L${x + zw} ${node.y - zh}`;
    d += ` L${x + zw * 2} ${node.y + (i < segments - 1 ? 0 : 0)}`;
  }
  // Final segment back to baseline
  d = `M${node.x - 20} ${node.y} L${node.x - 14} ${node.y - zh} L${node.x - 6} ${node.y + zh} L${node.x + 2} ${node.y - zh} L${node.x + 10} ${node.y + zh} L${node.x + 20} ${node.y}`;

  return (
    <g key={node.id}>
      <path
        d={d}
        fill="none"
        stroke={COMPONENT_STROKE}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {node.label && (
        <text
          x={node.x}
          y={node.y + 22}
          textAnchor="middle"
          fontSize={10}
          fontWeight="600"
          fill="#6B6D87"
        >
          {node.label}
        </text>
      )}
    </g>
  );
}

function renderJunction(node: CircuitNode) {
  return (
    <g key={node.id}>
      <circle
        cx={node.x}
        cy={node.y}
        r={3}
        fill={COMPONENT_STROKE}
        stroke="none"
      />
    </g>
  );
}

function renderWire(
  wire: CircuitWire,
  nodeMap: Map<string, CircuitNode>,
  isActive: boolean
) {
  const from = nodeMap.get(wire.from);
  const to = nodeMap.get(wire.to);
  if (!from || !to) return null;

  const points = [
    { x: from.x, y: from.y },
    ...(wire.waypoints || []),
    { x: to.x, y: to.y },
  ];

  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <path
      key={wire.id}
      d={d}
      fill="none"
      stroke={isActive ? WIRE_ACTIVE_COLOR : WIRE_COLOR}
      strokeWidth={isActive ? 2.5 : 2}
      strokeDasharray={isActive ? "none" : "6 4"}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={isActive ? 1 : 0.5}
      style={{ transition: "stroke 0.4s ease, opacity 0.4s ease, stroke-dasharray 0.4s ease" }}
    />
  );
}

// --- Main Component ---

export function CircuitBuilder({
  question,
  hint,
  nodes,
  wires,
  correctSwitchStates,
  onComplete,
}: CircuitBuilderProps) {
  // Initialize all switches to OFF
  const [switchStates, setSwitchStates] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {};
      for (const node of nodes) {
        if (node.type === "switch") {
          initial[node.id] = false;
        }
      }
      return initial;
    }
  );
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(
    null
  );
  const [isComplete, setIsComplete] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Derived state
  const nodeMap = useMemo(
    () => new Map(nodes.map((n) => [n.id, n])),
    [nodes]
  );
  const litBulbs = useMemo(
    () => computeLitBulbs(nodes, wires, switchStates),
    [nodes, wires, switchStates]
  );
  const activeWires = useMemo(
    () => computeActiveWires(nodes, wires, switchStates),
    [nodes, wires, switchStates]
  );

  // Validation state for bulbs (only after check)
  const bulbValidation = useMemo(() => {
    if (!feedback) return new Map<string, "correct" | "incorrect">();
    const result = new Map<string, "correct" | "incorrect">();
    // After checking, determine which bulbs should be lit in the correct state
    const correctLitBulbs = computeLitBulbs(nodes, wires, correctSwitchStates);
    for (const node of nodes) {
      if (node.type === "bulb") {
        const shouldBeLit = correctLitBulbs.has(node.id);
        const isLit = litBulbs.has(node.id);
        result.set(node.id, shouldBeLit === isLit ? "correct" : "incorrect");
      }
    }
    return result;
  }, [feedback, nodes, wires, correctSwitchStates, litBulbs]);

  // Handlers
  const toggleSwitch = useCallback(
    (id: string) => {
      if (isComplete) return;
      setSwitchStates((prev) => ({ ...prev, [id]: !prev[id] }));
      setFeedback(null);
    },
    [isComplete]
  );

  const checkAnswer = useCallback(() => {
    const isCorrect = Object.entries(correctSwitchStates).every(
      ([switchId, expectedState]) => switchStates[switchId] === expectedState
    );
    if (isCorrect) {
      setFeedback("correct");
      setIsComplete(true);
      onComplete?.(true);
    } else {
      setFeedback("incorrect");
    }
  }, [switchStates, correctSwitchStates, onComplete]);

  const resetPuzzle = useCallback(() => {
    const initial: Record<string, boolean> = {};
    for (const node of nodes) {
      if (node.type === "switch") initial[node.id] = false;
    }
    setSwitchStates(initial);
    setFeedback(null);
    setIsComplete(false);
    setShowHint(false);
  }, [nodes]);

  // Compute SVG viewBox bounds from node positions
  const viewBox = useMemo(() => {
    if (nodes.length === 0) return "0 0 500 400";
    const xs = nodes.map((n) => n.x);
    const ys = nodes.map((n) => n.y);
    // Also consider waypoints
    for (const wire of wires) {
      if (wire.waypoints) {
        for (const wp of wire.waypoints) {
          xs.push(wp.x);
          ys.push(wp.y);
        }
      }
    }
    const minX = Math.min(...xs) - 50;
    const minY = Math.min(...ys) - 50;
    const maxX = Math.max(...xs) + 50;
    const maxY = Math.max(...ys) + 50;
    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
  }, [nodes, wires]);

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
              ? "Circuit complete! Well done!"
              : "Not quite -- check your switches!"}
          </div>
        )}

        {/* Switch status chips */}
        {nodes.some((n) => n.type === "switch") && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {nodes
              .filter((n) => n.type === "switch")
              .map((sw) => (
                <button
                  key={sw.id}
                  onClick={() => !isComplete && toggleSwitch(sw.id)}
                  disabled={isComplete}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all",
                    switchStates[sw.id]
                      ? "bg-secondary/15 text-secondary border-secondary/40 shadow-glow-cyan"
                      : "bg-muted text-muted-foreground border-border hover:border-muted-foreground/40"
                  )}
                >
                  {sw.label || sw.id}: {switchStates[sw.id] ? "ON" : "OFF"}
                </button>
              ))}
          </div>
        )}

        {/* Circuit SVG */}
        <div className="rounded-2xl border-2 border-border bg-white p-4 flex justify-center overflow-hidden">
          <svg
            viewBox={viewBox}
            className="w-full"
            style={{ maxHeight: "400px" }}
            aria-label="Interactive circuit diagram"
          >
            {/* Wires (render first, behind components) */}
            {wires.map((wire) =>
              renderWire(wire, nodeMap, activeWires.has(wire.id))
            )}

            {/* Components */}
            {nodes.map((node) => {
              switch (node.type) {
                case "battery":
                  return renderBattery(node);
                case "bulb":
                  return renderBulb(
                    node,
                    litBulbs.has(node.id),
                    bulbValidation.get(node.id) ?? null
                  );
                case "switch":
                  return renderSwitch(
                    node,
                    switchStates[node.id] || false,
                    isComplete,
                    toggleSwitch
                  );
                case "ammeter":
                  return renderAmmeter(node, litBulbs.size > 0);
                case "voltmeter":
                  return renderVoltmeter(node, litBulbs.size > 0);
                case "resistor":
                  return renderResistor(node);
                case "junction":
                  return renderJunction(node);
                default:
                  return null;
              }
            })}
          </svg>
        </div>

        {/* Instruction text */}
        <p className="text-center text-sm text-muted-foreground">
          Click the switches to toggle them and complete the circuit
        </p>

        {/* Controls - standard pattern */}
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
            <Button size="sm" onClick={checkAnswer}>
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

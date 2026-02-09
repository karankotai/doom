"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import type { CourseWithUnits, CourseLesson } from "@/lib/types/course";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Brilliant-style stepping-stone course path.
 *
 * - Large colorful circles that zigzag left ↔ right
 * - SVG connector curves between nodes
 * - Rounded unit-header banners with per-unit colors
 * - Click-to-expand popup with "Start" button
 */

// Vibrant, distinct colors for each unit section
const UNIT_COLORS = [
  "#6C63FF", // Nebula Purple
  "#00C2D4", // Electric Cyan
  "#FF6AC1", // Cosmic Magenta
  "#58CC02", // Feather Green
  "#FF9500", // Solar Orange
  "#FF3B5C", // Supernova Red
  "#1CB0F6", // Dodger Blue
  "#B388FF", // Aurora Violet
];

// Zigzag: nodes snake in a sine-wave pattern
function getNodeOffset(index: number): number {
  const positions = [0, 55, 80, 55, 0, -55, -80, -55];
  return positions[index % positions.length]!;
}

const NODE_GAP = 120; // vertical gap between node centers (enough room for labels)
const NODE_SIZE = 64;
const CHECKPOINT_SIZE = 76;

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<CourseWithUnits | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLesson, setSelectedLesson] = useState<CourseLesson | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [courseRes, progressRes] = await Promise.all([
        api.getCourse(courseId),
        api.getCourseProgress(courseId),
      ]);
      setCourse(courseRes.course);
      setCompletedLessonIds(progressRes.completedLessonIds);
      setHasStarted(!!progressRes.courseProgress);
    } catch {
      // handle error
    } finally {
      setIsLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Flatten all lessons
  const allLessons: CourseLesson[] = useMemo(
    () => (course ? course.units.flatMap((u) => u.lessons) : []),
    [course]
  );

  // Unlock logic
  const completedSet = useMemo(() => new Set(completedLessonIds), [completedLessonIds]);
  const unlockedLessonIds = useMemo(() => {
    const set = new Set<string>();
    for (let i = 0; i < allLessons.length; i++) {
      const lesson = allLessons[i]!;
      if (i === 0) {
        set.add(lesson.id);
      } else if (completedSet.has(allLessons[i - 1]!.id)) {
        set.add(lesson.id);
      }
    }
    return set;
  }, [allLessons, completedSet]);

  // Build a flat list of "rows" — unit headers + lesson nodes — for the path
  const pathRows = useMemo(() => {
    if (!course) return [];
    const rows: Array<
      | { kind: "unit-header"; title: string; description: string | null; unitId: string; unitIndex: number }
      | { kind: "lesson"; lesson: CourseLesson; globalIndex: number; unitIndex: number }
    > = [];
    let gi = 0;
    course.units.forEach((unit, ui) => {
      rows.push({ kind: "unit-header", title: unit.title, description: unit.description, unitId: unit.id, unitIndex: ui });
      for (const lesson of unit.lessons) {
        rows.push({ kind: "lesson", lesson, globalIndex: gi, unitIndex: ui });
        gi++;
      }
    });
    return rows;
  }, [course]);

  const handleStart = async () => {
    await api.startCourse(courseId);
    setHasStarted(true);
  };

  if (isLoading || !course) {
    return (
      <div className="max-w-xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  const totalLessons = allLessons.length;
  const completedCount = completedLessonIds.length;
  const progressPercent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
  const courseColor = course.color;

  return (
    <div className="max-w-xl mx-auto pb-20">
      {/* Back */}
      <Button variant="ghost" size="sm" onClick={() => router.push("/courses")} className="mb-4">
        ← Back to Courses
      </Button>

      {/* Course header card */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 mb-8"
        style={{
          background: `linear-gradient(135deg, ${courseColor}15, ${courseColor}05)`,
          border: `2px solid ${courseColor}20`,
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-3xl shadow-lg shrink-0"
            style={{ backgroundColor: `${courseColor}20` }}
          >
            {course.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-extrabold text-foreground">{course.title}</h1>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-3 rounded-full bg-background/60 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%`, backgroundColor: courseColor }}
            />
          </div>
          <span className="text-xs font-bold text-muted-foreground whitespace-nowrap">
            {completedCount}/{totalLessons}
          </span>
        </div>
        {!hasStarted && (
          <Button
            size="lg"
            className="w-full mt-4 text-white font-bold"
            style={{ backgroundColor: courseColor }}
            onClick={handleStart}
          >
            Start Course
          </Button>
        )}
      </div>

      {/* ━━━━━ Learning Path ━━━━━ */}
      <div className="relative flex flex-col items-center">
        {pathRows.map((row, rowIdx) => {
          // ── UNIT HEADER ──
          if (row.kind === "unit-header") {
            const unitColor = UNIT_COLORS[row.unitIndex % UNIT_COLORS.length]!;
            return (
              <div
                key={`unit-${row.unitId}`}
                className="w-full flex justify-center mb-6 mt-4"
                style={{ zIndex: 10 }}
              >
                <div
                  className="flex items-center justify-center gap-2 rounded-2xl px-6 py-3 shadow-md"
                  style={{ backgroundColor: unitColor, maxWidth: "360px" }}
                >
                  <span className="text-white text-sm font-extrabold uppercase tracking-widest">
                    {row.title}
                  </span>
                </div>
              </div>
            );
          }

          // ── LESSON NODE ──
          const { lesson, globalIndex, unitIndex } = row;
          const nodeColor = UNIT_COLORS[unitIndex % UNIT_COLORS.length]!;
          const isCompleted = completedSet.has(lesson.id);
          const isUnlocked = unlockedLessonIds.has(lesson.id);
          const isLocked = !isCompleted && !isUnlocked;
          const isCurrent = isUnlocked && !isCompleted;
          const isSelected = selectedLesson?.id === lesson.id;
          const offset = getNodeOffset(globalIndex);

          const isCheckpoint = lesson.isCheckpointReview;
          const size = isCheckpoint ? CHECKPOINT_SIZE : NODE_SIZE;

          // Find the next lesson node to draw connector
          let nextLessonRow: (typeof pathRows)[number] | null = null;
          for (let j = rowIdx + 1; j < pathRows.length; j++) {
            if (pathRows[j]!.kind === "lesson") {
              nextLessonRow = pathRows[j]!;
              break;
            }
          }
          const hasConnector = nextLessonRow !== null && nextLessonRow.kind === "lesson";
          const nextOffset = hasConnector ? getNodeOffset(nextLessonRow!.kind === "lesson" ? (nextLessonRow as { kind: "lesson"; globalIndex: number }).globalIndex : 0) : 0;

          return (
            <div
              key={lesson.id}
              className="relative w-full flex flex-col items-center"
              style={{ marginBottom: hasConnector ? "8px" : "24px", zIndex: isSelected ? 20 : 5 }}
            >
              {/* SVG connector curve to next lesson */}
              {hasConnector && (
                <svg
                  className="absolute pointer-events-none"
                  style={{
                    top: `${size / 2}px`,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "300px",
                    height: `${NODE_GAP}px`,
                    overflow: "visible",
                    zIndex: 0,
                  }}
                  viewBox={`-150 0 300 ${NODE_GAP}`}
                >
                  <path
                    d={`M ${offset} 0 C ${offset} ${NODE_GAP * 0.4}, ${nextOffset} ${NODE_GAP * 0.6}, ${nextOffset} ${NODE_GAP}`}
                    fill="none"
                    stroke={isCompleted ? nodeColor : "hsl(var(--border))"}
                    strokeWidth={isCompleted ? 5 : 4}
                    strokeLinecap="round"
                    opacity={isCompleted ? 0.5 : 0.25}
                  />
                </svg>
              )}

              {/* Node + label */}
              <div
                className="relative flex flex-col items-center transition-transform duration-300"
                style={{ transform: `translateX(${offset}px)`, zIndex: 2 }}
              >
                {/* Circle button */}
                <button
                  onClick={() => {
                    if (!isLocked) {
                      setSelectedLesson(isSelected ? null : lesson);
                    }
                  }}
                  disabled={isLocked}
                  className={cn(
                    "relative flex items-center justify-center rounded-full transition-all duration-200",
                    isCurrent && "cursor-pointer",
                    isLocked && "cursor-not-allowed",
                  )}
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: isCompleted
                      ? nodeColor
                      : isCurrent
                      ? `${nodeColor}15`
                      : "hsl(var(--muted))",
                    border: `4px solid ${
                      isCompleted
                        ? nodeColor
                        : isCurrent
                        ? nodeColor
                        : "hsl(var(--border))"
                    }`,
                    boxShadow: isCurrent
                      ? `0 0 24px ${nodeColor}35, 0 6px 16px ${nodeColor}18`
                      : isCompleted
                      ? `0 4px 14px ${nodeColor}25`
                      : "0 2px 8px rgba(0,0,0,0.06)",
                    opacity: isLocked ? 0.35 : 1,
                    transform: isSelected && !isLocked ? "scale(1.12)" : "scale(1)",
                  }}
                >
                  {isCompleted ? (
                    <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span
                      className={cn(
                        isCheckpoint ? "text-2xl" : "text-xl",
                      )}
                      style={{ filter: isLocked ? "grayscale(1)" : undefined }}
                    >
                      {lesson.emoji}
                    </span>
                  )}

                  {/* Animated ring for current node */}
                  {isCurrent && (
                    <span
                      className="absolute inset-[-6px] rounded-full animate-glow-pulse pointer-events-none"
                      style={{ border: `3px solid ${nodeColor}30` }}
                    />
                  )}
                </button>

                {/* Title label — sits above the connector line with a bg knockout */}
                <span
                  className={cn(
                    "relative mt-2 px-2 py-0.5 rounded-md text-[11px] font-bold text-center leading-tight",
                    isLocked ? "text-muted-foreground/35" : "text-foreground/80",
                    isCheckpoint && "text-xs",
                  )}
                  style={{
                    maxWidth: `${size + 48}px`,
                    backgroundColor: "hsl(var(--background))",
                    zIndex: 3,
                  }}
                >
                  {lesson.title}
                </span>

                {/* Checkpoint badge */}
                {isCheckpoint && !isLocked && (
                  <span
                    className="mt-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${nodeColor}15`,
                      color: nodeColor,
                      zIndex: 3,
                    }}
                  >
                    Checkpoint
                  </span>
                )}

                {/* Popup card when selected */}
                {isSelected && !isLocked && (
                  <div
                    className="absolute z-30 w-64 p-4 rounded-2xl border-2 bg-card shadow-xl animate-pop"
                    style={{
                      borderColor: `${nodeColor}30`,
                      top: `${size + 20}px`,
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    {/* Arrow */}
                    <div
                      className="absolute -top-[9px] left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-card border-l-2 border-t-2"
                      style={{ borderColor: `${nodeColor}30` }}
                    />
                    <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                      {lesson.emoji} {lesson.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {lesson.description || "Complete this lesson to progress."}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs font-bold text-warning flex items-center gap-1">
                        ⚡ +{lesson.xpReward} XP
                      </span>
                      <Link href={`/courses/${courseId}/lessons/${lesson.id}`}>
                        <Button
                          size="sm"
                          className="text-white font-bold rounded-xl px-6"
                          style={{ backgroundColor: nodeColor }}
                        >
                          {isCompleted ? "Review" : "Start"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Trophy at the end */}
        <div className="flex flex-col items-center mt-4">
          <div
            className={cn(
              "flex items-center justify-center rounded-full w-16 h-16 text-2xl",
              completedCount === totalLessons && totalLessons > 0
                ? "animate-pop"
                : "opacity-25",
            )}
            style={{
              backgroundColor:
                completedCount === totalLessons && totalLessons > 0
                  ? `${courseColor}20`
                  : "hsl(var(--muted))",
              border: `4px solid ${
                completedCount === totalLessons && totalLessons > 0
                  ? courseColor
                  : "hsl(var(--border))"
              }`,
            }}
          >
            🏆
          </div>
          {completedCount === totalLessons && totalLessons > 0 && (
            <div className="text-center mt-4">
              <h2 className="text-xl font-extrabold text-foreground">Course Complete!</h2>
              <p className="text-sm text-muted-foreground mt-1">
                You&apos;ve mastered {course.title}!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

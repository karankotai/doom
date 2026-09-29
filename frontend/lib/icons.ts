import type { LucideIcon } from "lucide-react";
import {
  Trophy,
  Flame,
  Star,
  Medal,
  Target,
  BookOpen,
  Zap,
  ListChecks,
  GraduationCap,
  Brain,
  CircleDot,
  Highlighter,
  LineChart,
  Swords,
  Scale,
  ArrowUpDown,
  Palette,
  Globe,
  LayoutGrid,
  Divide,
  BarChart3,
  Link2,
  Microscope,
  GitBranch,
  Beaker,
  Map,
  Coins,
  Languages,
  Atom,
  Music,
  HeartPulse,
  Compass,
  BookMarked,
  Sparkles,
  Building2,
  Calculator,
} from "lucide-react";
import type { AppletType } from "@/lib/types/applet";

/* Named 6-tint course palette — deterministic, no random inline hex.
 * Each tint = border, bg, text/foreground variants.
 */
export const COURSE_TINTS = [
  {
    key: "amber",
    name: "Hazard",
    border: "border-primary/40",
    bg: "bg-primary/10",
    chipBg: "bg-primary/15",
    text: "text-primary",
    ring: "ring-primary/30",
  },
  {
    key: "ember",
    name: "Ember",
    border: "border-accent/40",
    bg: "bg-accent/10",
    chipBg: "bg-accent/15",
    text: "text-accent",
    ring: "ring-accent/30",
  },
  {
    key: "teal",
    name: "Fallout",
    border: "border-secondary/40",
    bg: "bg-secondary/10",
    chipBg: "bg-secondary/15",
    text: "text-secondary",
    ring: "ring-secondary/30",
  },
  {
    key: "violet",
    name: "Radiation",
    border: "border-purple/40",
    bg: "bg-purple/10",
    chipBg: "bg-purple/15",
    text: "text-purple",
    ring: "ring-purple/30",
  },
  {
    key: "warning",
    name: "Caution",
    border: "border-warning/40",
    bg: "bg-warning/10",
    chipBg: "bg-warning/15",
    text: "text-warning",
    ring: "ring-warning/30",
  },
  {
    key: "danger",
    name: "Danger",
    border: "border-destructive/40",
    bg: "bg-destructive/10",
    chipBg: "bg-destructive/15",
    text: "text-destructive",
    ring: "ring-destructive/30",
  },
] as const;

export type CourseTint = (typeof COURSE_TINTS)[number];

export const courseTintForIndex = (idx: number): CourseTint =>
  COURSE_TINTS[idx % COURSE_TINTS.length]!;

/* Achievement def icon mapping — used on dashboard, profile page.
 * Ordered by the achievement defs in dashboard/page.tsx and backend.
 */
export const ACHIEVEMENT_ICON: Record<string, LucideIcon> = {
  first_lesson: Trophy,
  streak_3: Flame,
  streak_7: Star,
  level_5: Medal,
  xp_100: Target,
  xp_500: BookOpen,
} as const;

/* Tiers for framed achievement tiles — 0 = bronze, 1 = silver, 2 = gold, 3 = iridescent */
export const ACHIEVEMENT_TIER: Record<string, 0 | 1 | 2 | 3> = {
  first_lesson: 0,
  streak_3: 0,
  xp_100: 1,
  level_5: 1,
  streak_7: 2,
  xp_500: 3,
} as const;

export const ACHIEVEMENT_REQ: Record<string, string> = {
  first_lesson: "Complete one lesson",
  streak_3: "Study for 3 days in a row",
  streak_7: "7-day streak (non-stop)",
  level_5: "Reach Level 5",
  xp_100: "Earn 100 total XP",
  xp_500: "Earn 500 total XP",
} as const;

/* Applet type → Lucide icon. Replaces 18 inline emoji chrome icons. */
export const APPLET_ICON: Record<AppletType, LucideIcon> = {
  mcq: CircleDot,
  "fill-blanks": ListChecks,
  "code-blocks": Brain,
  "venn-diagram": CircleDot,
  "highlight-text": Highlighter,
  "slope-graph": LineChart,
  chess: Swords,
  "comparative-advantage": Scale,
  ordering: ArrowUpDown,
  "color-mixing": Palette,
  "map-select": Globe,
  "categorization-grid": LayoutGrid,
  "fraction-visualizer": Divide,
  "chart-reading": BarChart3,
  "match-pairs": Link2,
  "interactive-diagram": Microscope,
  "thought-tree": GitBranch,
  "circuit-builder": Zap,
} as const;

/* A few extra Lucide icons reserved for generic course cover tiles.
 * Index picks one deterministically by course index.
 */
export const COURSE_ICON_POOL: readonly LucideIcon[] = [
  BookOpen,
  BookMarked,
  GraduationCap,
  Map,
  Beaker,
  Calculator,
  Languages,
  Atom,
  Coins,
  Building2,
  Music,
  HeartPulse,
  Compass,
  Sparkles,
] as const;

export const courseIconForIndex = (idx: number): LucideIcon =>
  COURSE_ICON_POOL[idx % COURSE_ICON_POOL.length]!;

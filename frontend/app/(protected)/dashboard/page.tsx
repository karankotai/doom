"use client";

import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  ChromeCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ACHIEVEMENT_ICON,
  ACHIEVEMENT_TIER,
  ACHIEVEMENT_REQ,
  APPLET_ICON,
  courseIconForIndex,
  courseTintForIndex,
} from "@/lib/icons";
import {
  Zap,
  Flame,
  Play,
  ArrowRight,
  BookOpen,
  Gamepad2,
  Sparkles,
  Target,
  Check,
  Snowflake,
  Bomb,
  type LucideIcon,
} from "lucide-react";
import type { AppletType } from "@/lib/types/applet";

const ACHIEVEMENT_DEFS = [
  { type: "first_lesson", label: "First Steps" },
  { type: "streak_3", label: "On Fire" },
  { type: "streak_7", label: "Week Warrior" },
  { type: "level_5", label: "Apprentice" },
  { type: "xp_100", label: "Century" },
  { type: "xp_500", label: "Scholar" },
] as const;

const TIER_FRAME: Record<0 | 1 | 2 | 3, string> = {
  0: "border-amber-800/60 from-amber-900/20 via-amber-950/30 to-stone-950/40",
  1: "border-slate-400/50 from-slate-500/20 via-slate-700/30 to-stone-950/40",
  2: "border-yellow-400/60 from-yellow-500/20 via-amber-600/20 to-amber-900/40",
  3: "border-fuchsia-400/50 from-purple-500/20 via-fuchsia-500/15 to-amber-500/15",
};

const TIER_LABEL: Record<0 | 1 | 2 | 3, { name: string; variant: "default" | "accent" | "warning" | "purple" | "outline" | "muted" | "destructive" | "secondary" }> = {
  0: { name: "Bronze", variant: "default" },
  1: { name: "Silver", variant: "muted" },
  2: { name: "Gold", variant: "warning" },
  3: { name: "Iridescent", variant: "purple" },
};

const APPLET_CHIPS: { type: AppletType; label: string }[] = [
  { type: "mcq", label: "MCQ" },
  { type: "fill-blanks", label: "Fill blanks" },
  { type: "code-blocks", label: "Code" },
  { type: "venn-diagram", label: "Venn" },
  { type: "highlight-text", label: "Highlight" },
  { type: "slope-graph", label: "Slope" },
  { type: "chess", label: "Chess" },
  { type: "comparative-advantage", label: "Advantage" },
  { type: "ordering", label: "Order" },
  { type: "color-mixing", label: "Color" },
  { type: "map-select", label: "Maps" },
  { type: "categorization-grid", label: "Categorize" },
  { type: "fraction-visualizer", label: "Fractions" },
  { type: "chart-reading", label: "Charts" },
  { type: "match-pairs", label: "Pairs" },
  { type: "interactive-diagram", label: "Diagrams" },
  { type: "thought-tree", label: "Tree" },
  { type: "circuit-builder", label: "Circuits" },
];

const PROMO_COURSES: readonly {
  title: string;
  subtitle: string;
  meta: string;
}[] = [
  {
    title: "Intro to Microeconomics",
    subtitle: "Supply, demand, and comparative advantage.",
    meta: "6 units · 24 lessons",
  },
  {
    title: "Logic & decision trees",
    subtitle: "How to not get fooled by 50/50 problems.",
    meta: "4 units · 18 lessons",
  },
  {
    title: "Civics you forgot from high school",
    subtitle: "Branches of government, voting systems, and budgets.",
    meta: "5 units · 22 lessons",
  },
] as const;

export default function DashboardPage() {
  const { user, profile, achievements } = useAuth();
  const earnedTypes = new Set(achievements.map((a) => a.type));

  const xpTotal = profile?.xp ?? 0;
  const xpToNext = profile?.xpToNextLevel ?? 100;
  const xpPct = Math.min(100, xpToNext > 0 ? (xpTotal / xpToNext) * 100 : 0);

  const dailyXp = profile?.dailyXp ?? 0;
  const dailyGoal = profile?.dailyGoal ?? 50;
  const dailyPct = Math.min(100, dailyGoal > 0 ? (dailyXp / dailyGoal) * 100 : 0);
  const streak = profile?.currentStreak ?? 0;
  const level = profile?.level ?? 1;
  const title = profile?.title ?? "Novice Learner";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1.5">
          <div className="text-label text-muted-foreground">Dashboard</div>
          <h1 className="text-h1 text-foreground">
            Welcome back, {user?.name ?? "learner"}.
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            {streak === 0
              ? "Your streak is on zero — today is a perfect day to restart it."
              : `You're on a ${streak}-day streak. Don't waste it.`}
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/lesson">
            <Play className="h-4 w-4" />
            Start today's lesson
          </Link>
        </Button>
      </div>

      {/* Asymmetric chrome row: 2/3 progress panel + 1/3 streak card */}
      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <ChromeCard>
          <CardHeader className="pb-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md">
                    <span className="text-2xl font-black tabular-nums">{level}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    size="sm"
                    className="absolute -bottom-2 -right-2"
                  >
                    Lvl
                  </Badge>
                </div>
                <div>
                  <div className="text-caption font-semibold text-muted-foreground">
                    {title}
                  </div>
                  <div className="text-h2 font-black leading-tight">
                    {xpTotal.toLocaleString()}
                    <span className="text-muted-foreground/70 font-bold text-lg ml-1">
                      XP
                    </span>
                  </div>
                </div>
              </div>
              <Badge variant="muted" size="sm" iconLeft={<Zap className="h-3 w-3 text-warning" />}>
                <span className="tabular-nums">
                  {(xpToNext - xpTotal).toLocaleString()}
                </span>
                <span className="text-muted-foreground/80"> to Level {level + 1}</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-5 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-caption font-semibold">
                <span className="text-muted-foreground">Progress to Level {level + 1}</span>
                <span className="text-foreground tabular-nums">
                  {Math.round(xpPct)}%
                </span>
              </div>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${xpPct}%` }} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-caption font-semibold">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Target className="h-3 w-3 text-accent" />
                  Daily goal
                </span>
                <span className="text-foreground tabular-nums">
                  {dailyXp} / {dailyGoal} XP
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${dailyPct}%` }}
                />
              </div>
            </div>
          </CardContent>
        </ChromeCard>

        <ChromeCard>
          <CardContent className="pt-5 h-full flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="destructive" size="sm" iconLeft={<Flame className="h-3 w-3" />}>
                  Streak
                </Badge>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-5xl font-black text-destructive tabular-nums leading-none">
                    {streak}
                  </span>
                  <span className="text-sm font-bold text-muted-foreground">
                    day{streak === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
                {streak >= 7 ? (
                  <Bomb className="h-6 w-6" />
                ) : streak >= 3 ? (
                  <Flame className="h-6 w-6" />
                ) : (
                  <Snowflake className="h-6 w-6" />
                )}
              </div>
            </div>
            <p className="mt-auto pt-6 text-sm text-muted-foreground leading-relaxed">
              {streak === 0
                ? "Log any lesson today to start a streak."
                : streak === 1
                ? "Do a second day tomorrow to really lock it in."
                : streak < 7
                ? `Come back tomorrow for ${streak + 1} in a row.`
                : `You're past the 7-day wall. Keep it going.`}
            </p>
          </CardContent>
        </ChromeCard>
      </div>

      {/* Main content grid: 2/3 learning path + 1/3 sidebar */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <h2 className="text-h3 font-bold">Pick up where you left off</h2>
              </div>
              <Button asChild variant="link" size="sm">
                <Link href="/courses" className="gap-1">
                  All courses <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-3">
              {PROMO_COURSES.map((course, idx) => {
                const tint = courseTintForIndex(idx);
                const Icon = courseIconForIndex(idx) as LucideIcon;
                return (
                  <Link
                    key={course.title}
                    href="/courses"
                    className="group block"
                  >
                    <Card className="transition-colors group-hover:border-border">
                      <CardContent className="pt-5 flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg ${tint.bg} ${tint.text} border ${tint.border}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold text-foreground truncate">
                            {course.title}
                          </div>
                          <div className="text-caption text-muted-foreground mt-0.5 truncate">
                            {course.subtitle}
                          </div>
                          <div className="mt-2 flex items-center gap-3">
                            <Badge variant="muted" size="sm">{course.meta}</Badge>
                            <span className="text-caption text-muted-foreground group-hover:text-primary transition-colors inline-flex items-center gap-1 font-semibold">
                              Continue <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gamepad2 className="h-4 w-4 text-accent" />
                <h2 className="text-h3 font-bold">Applet gallery</h2>
              </div>
              <Button asChild variant="link" size="sm">
                <Link href="/applets" className="gap-1">
                  Open gallery <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
            <Card>
              <CardContent className="pt-5 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You're not limited to courses. These 18 puzzle types are the
                  real reason Doom doesn't feel like homework. Pick one and do
                  five in a row.
                </p>
                <div className="flex flex-wrap gap-2">
                  {APPLET_CHIPS.map(({ type, label }) => {
                    const Icon = APPLET_ICON[type] as LucideIcon | undefined;
                    return (
                      <Badge
                        key={type}
                        variant="muted"
                        size="default"
                        iconLeft={Icon ? <Icon className="h-3.5 w-3.5 text-primary" /> : undefined}
                        className="cursor-pointer hover:bg-muted/80 hover:text-foreground transition-colors"
                      >
                        {label}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple" />
                <h2 className="text-h3 font-bold">Generate exercises</h2>
              </div>
              <Button asChild variant="secondary" size="sm">
                <Link href="/generate">
                  Open generator
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
            <Card className="border border-purple/30 bg-purple/[0.04]">
              <CardContent className="pt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <CardTitle className="text-h3">Anything is practice.</CardTitle>
                  <CardDescription className="pt-1 max-w-xl">
                    Supply a topic, pick a difficulty, get 5 exercises at your
                    level. Great for cramming a niche sub-topic the night before.
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2 shrink-0">
                  <Badge variant="muted" size="sm">History</Badge>
                  <Badge variant="muted" size="sm">Science</Badge>
                  <Badge variant="muted" size="sm">Languages</Badge>
                  <Badge variant="muted" size="sm">Code</Badge>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-h3 font-bold">Achievements</h2>
              <span className="text-caption font-semibold text-muted-foreground">
                {achievements.length} / {ACHIEVEMENT_DEFS.length}
              </span>
            </div>
            <Card>
              <CardContent className="pt-5">
                <div className="grid grid-cols-2 gap-3">
                  {ACHIEVEMENT_DEFS.map((def) => {
                    const earned = earnedTypes.has(def.type);
                    const tier = (ACHIEVEMENT_TIER[def.type] ?? 0) as 0 | 1 | 2 | 3;
                    const Icon = ACHIEVEMENT_ICON[def.type] as
                      | LucideIcon
                      | undefined;
                    const frame = TIER_FRAME[tier];
                    const tierMeta = TIER_LABEL[tier];
                    const req = ACHIEVEMENT_REQ[def.type];
                    return (
                      <div
                        key={def.type}
                        className={`relative rounded-xl border bg-gradient-to-br p-3 ${frame} ${
                          earned ? "" : "opacity-50 saturate-50"
                        }`}
                        title={earned ? def.label : req}
                      >
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                earned
                                  ? "bg-card border border-border/70"
                                  : "bg-background/50 border border-border/40"
                              }`}
                            >
                              {Icon ? (
                                <Icon
                                  className={`h-5 w-5 ${
                                    earned ? "text-foreground" : "text-muted-foreground"
                                  }`}
                                />
                              ) : null}
                            </div>
                            <Badge
                              variant={tierMeta.variant as any}
                              size="sm"
                              className="text-[10px]"
                            >
                              {tierMeta.name}
                            </Badge>
                          </div>
                          <div className="space-y-0.5 min-w-0">
                            <div className="text-sm font-bold text-foreground truncate">
                              {def.label}
                            </div>
                            <div className="text-[11px] leading-snug text-muted-foreground line-clamp-2 inline-flex items-center gap-1">
                              {earned ? (
                                <>
                                  <Check className="h-3 w-3 text-accent shrink-0" />
                                  <span className="text-foreground/80 font-semibold">Unlocked</span>
                                </>
                              ) : (
                                req
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {achievements.length === 0 && (
                  <p className="pt-5 text-center text-sm text-muted-foreground">
                    Complete one lesson to earn your first achievement.
                  </p>
                )}
              </CardContent>
            </Card>
          </section>

          <section className="space-y-3">
            <h2 className="text-h3 font-bold">Today's do-this-first</h2>
            <Card className="border-primary/40 bg-primary/[0.06]">
              <CardContent className="pt-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-h3">Finish one lesson.</CardTitle>
                    <CardDescription className="pt-1">
                      5 minutes to keep your streak alive, 15 to fill the daily goal.
                    </CardDescription>
                  </div>
                  <Badge variant="default" size="sm">
                    <Zap className="h-3 w-3" />
                    +20 XP
                  </Badge>
                </div>
                <Button asChild size="sm">
                  <Link href="/lesson">
                    <Play className="h-3.5 w-3.5" />
                    Start lesson
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </aside>
      </div>
    </div>
  );
}

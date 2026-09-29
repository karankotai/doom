"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import { useToast } from "@/components/ui/use-toast";
import { ApiClientError } from "@/lib/api";
import {
  Zap,
  Trophy,
  Flame,
  ArrowRight,
  BookOpen,
  Gamepad2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const PILLARS = [
  {
    step: "01",
    eyebrow: "Learning paths",
    title: "Pick a topic you've been putting off",
    description:
      "Courses are broken into lessons, checkpoints, and reviews. Each one is short enough to finish during a commute.",
    Icon: BookOpen,
    tint: "bg-primary/10 text-primary",
  },
  {
    step: "02",
    eyebrow: "18 puzzle types",
    title: "Not just multiple choice, not just flashcards",
    description:
      "Venn diagrams, chess tactics, circuit builders, color theory, map quizzes, ordering problems. Your brain doesn't check out.",
    Icon: Gamepad2,
    tint: "bg-accent/10 text-accent",
  },
  {
    step: "03",
    eyebrow: "AI generator",
    title: "Anything is a lesson if you ask nicely",
    description:
      "Stuck on a niche topic? Type it in. The generator writes exercises at your level, in the applet types you actually like.",
    Icon: Sparkles,
    tint: "bg-purple/10 text-purple",
  },
] as const;

export default function HomePage() {
  const { isAuthenticated, isLoading, demoLogin } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isTryingDemo, setIsTryingDemo] = useState(false);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleTryDemo = async () => {
    setIsTryingDemo(true);
    try {
      await demoLogin();
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.message
          : "An error occurred. Please try again.";
      toast({
        variant: "destructive",
        title: "Couldn't start demo",
        description: message,
      });
    } finally {
      setIsTryingDemo(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="container relative flex flex-col">
        {/* Top nav bar */}
        <header className="flex h-16 items-center justify-between">
          <Link href="/" className="shrink-0">
            <Logo size="md" />
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </header>

        {/* Hero — 2-col editorial layout */}
        <section className="grid gap-12 pb-20 pt-14 md:grid-cols-[1.05fr_0.95fr] md:items-center md:pt-20">
          <div className="space-y-8">
            <Badge variant="warning" size="sm" iconLeft={<Flame className="h-3 w-3" />}>
              Streaks, XP, and unlocks — so you actually come back
            </Badge>

            <h1 className="text-hero text-foreground max-w-[14ch]">
              Learning games that{" "}
              <span className="text-primary">don't suck.</span>
            </h1>

            <p className="text-lg-body max-w-[36rem] text-muted-foreground">
              Doom turns the stuff you were supposed to learn in school into
              short, satisfying puzzles. Fifteen minutes a day beats another
              doomed 4-hour course you'll quit after the intro video.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <Button
                size="lg"
                onClick={handleTryDemo}
                disabled={isTryingDemo}
                className="min-w-[10rem]"
              >
                {isTryingDemo ? (
                  "Starting demo…"
                ) : (
                  <>
                    Try it out
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
              <Button asChild size="lg" variant="outline" className="min-w-[10rem]">
                <Link href="/register">
                  Get Started
                </Link>
              </Button>
              <Button asChild variant="link" size="lg" className="min-w-[10rem] justify-start sm:justify-center">
                <Link href="/login">I already have an account</Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 text-label text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                Free, no credit card
              </span>
              <span className="inline-flex items-center gap-2">
                <Zap className="h-4 w-4 text-warning" />
                15-min daily sessions
              </span>
              <span className="inline-flex items-center gap-2">
                <Trophy className="h-4 w-4 text-purple" />
                6 achievements to hunt
              </span>
            </div>
          </div>

          {/* Right column: device frame preview */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/5 to-purple/10 blur-2xl" />
            <div className="relative rounded-[1.6rem] border border-border/70 bg-card p-3 shadow-lg">
              <div className="flex h-8 items-center gap-1.5 rounded-t-lg bg-muted/40 px-3">
                <div className="h-2.5 w-2.5 rounded-full bg-destructive/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-warning/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-secondary/80" />
                <div className="ml-3 truncate text-caption text-muted-foreground">
                  doom.app / dashboard
                </div>
              </div>
              <div className="space-y-3 p-4 md:p-5">
                {/* Dashboard chrome mock */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-h3 font-bold">Welcome back, Demo</div>
                    <div className="text-caption text-muted-foreground">
                      2 lessons to hit your daily goal
                    </div>
                  </div>
                  <Badge variant="warning" size="sm" iconLeft={<Zap className="h-3 w-3" />}>
                    420 XP
                  </Badge>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-border bg-muted/50 p-3">
                    <div className="text-caption text-muted-foreground">Level</div>
                    <div className="mt-1 text-2xl font-black text-primary">4</div>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/50 p-3">
                    <div className="text-caption text-muted-foreground">Streak</div>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-destructive">12</span>
                      <span className="text-caption text-muted-foreground">days</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-muted/50 p-3">
                    <div className="text-caption text-muted-foreground">Daily</div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-background">
                      <div className="h-full w-2/3 rounded-full bg-primary" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/10 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold truncate">Intro to Microeconomics</div>
                      <div className="text-caption text-muted-foreground">6 units · 24 lessons</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/10 p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <Gamepad2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-bold truncate">Applet mix</div>
                      <div className="text-caption text-muted-foreground">MCQ · Venn · Chess</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works / pillars */}
        <section className="grid gap-5 pb-24 md:grid-cols-3">
          {PILLARS.map(({ step, eyebrow, title, description, Icon, tint }) => (
            <div
              key={step}
              className="group rounded-xl border border-border/70 bg-card p-6 transition-colors hover:border-border"
            >
              <div className="flex items-center justify-between">
                <Badge variant="muted" size="sm">{eyebrow}</Badge>
                <span className="text-caption font-bold text-muted-foreground/70">{step}</span>
              </div>
              <div className={`mt-5 inline-flex h-11 w-11 items-center justify-center rounded-lg ${tint}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-h2 text-foreground">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </section>

        <footer className="border-t border-border/60 py-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 text-caption text-muted-foreground">
              <Logo size="sm" />
              <span>© {new Date().getFullYear()} Doom. Every move delays the doom.</span>
            </div>
            <div className="flex items-center gap-5 text-label text-muted-foreground">
              <Link href="/login" className="hover:text-foreground">Log in</Link>
              <Link href="/register" className="hover:text-foreground">Sign up</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

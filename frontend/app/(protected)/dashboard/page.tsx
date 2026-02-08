"use client";

import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-title text-foreground">
            Welcome back, {user?.name ?? "Learner"}!
          </h1>
          <p className="text-muted-foreground font-medium">
            Ready to continue your learning journey?
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/lesson">Start Lesson</Link>
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Level card */}
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-duo-primary">
                <span className="text-2xl font-extrabold">1</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Current Level
                </p>
                <p className="text-xl font-bold text-foreground">Novice Learner</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* XP card */}
        <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Experience
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-warning">0</span>
                <span className="text-muted-foreground font-semibold">/ 100 XP</span>
              </div>
              {/* Duolingo-style progress bar */}
              <div className="h-4 w-full rounded-full bg-warning/20 overflow-hidden">
                <div
                  className="h-full rounded-full bg-warning transition-all duration-500"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streak card */}
        <Card className="bg-gradient-to-br from-destructive/5 to-destructive/10 border-destructive/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
                <span className="text-4xl animate-flame">🔥</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Day Streak
                </p>
                <p className="text-xl font-bold text-foreground">
                  <span className="text-3xl text-destructive">0</span> days
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Learning path - takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Your Learning Path</h2>

          {/* Applet Gallery Card */}
          <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-xl shadow-duo-accent">
                    🎮
                  </div>
                  <div>
                    <CardTitle>Applet Gallery</CardTitle>
                    <CardDescription>Try all types of interactive puzzles</CardDescription>
                  </div>
                </div>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/applets">Explore</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["❓ MCQ", "📝 Fill Blanks", "🧩 Code", "⭕ Venn", "🖍️ Highlight", "📐 Slope", "♟️ Chess"].map((type) => (
                  <span
                    key={type}
                    className="px-2 py-1 rounded-lg bg-accent/10 text-xs font-semibold text-accent"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Generate Card */}
          <Card className="bg-gradient-to-br from-purple/5 to-purple/10 border-purple/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple text-xl shadow-lg">
                    ✨
                  </div>
                  <div>
                    <CardTitle>AI Generator</CardTitle>
                    <CardDescription>Create exercises on any topic instantly</CardDescription>
                  </div>
                </div>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/generate">Create</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Enter any learning topic and get AI-generated interactive exercises tailored to your chosen difficulty level.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Achievements</h2>

          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-3 gap-4">
                {/* Locked achievements */}
                {["🏆", "⭐", "🎖️"].map((emoji, i) => (
                  <div
                    key={i}
                    className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-muted text-2xl opacity-40"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Complete lessons to unlock achievements!
              </p>
            </CardContent>
          </Card>

          {/* Daily goal */}
          <Card className="bg-gradient-to-br from-purple/5 to-purple/10 border-purple/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🎯</span> Daily Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">Progress</span>
                  <span className="font-bold text-purple">0 / 50 XP</span>
                </div>
                <div className="h-3 w-full rounded-full bg-purple/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-purple transition-all duration-500"
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

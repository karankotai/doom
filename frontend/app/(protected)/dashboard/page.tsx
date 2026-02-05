"use client";

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
        <Button size="lg">Start Lesson</Button>
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

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-xl shadow-duo-accent">
                    📚
                  </div>
                  <div>
                    <CardTitle>Getting Started</CardTitle>
                    <CardDescription>Begin your learning journey</CardDescription>
                  </div>
                </div>
                <Button variant="secondary" size="sm">
                  Start
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Unit progress */}
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((unit) => (
                  <div
                    key={unit}
                    className={`flex-1 h-2 rounded-full ${
                      unit === 1 ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                0 of 5 units completed
              </p>
            </CardContent>
          </Card>

          {/* Empty state for more courses */}
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-lg text-foreground mb-2">
                Explore More Courses
              </h3>
              <p className="text-muted-foreground mb-4">
                Discover new topics and expand your knowledge
              </p>
              <Button variant="outline">Browse Courses</Button>
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

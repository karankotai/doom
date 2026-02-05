"use client";

import { useAuth } from "@/lib/context/auth-context";
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name ?? "Learner"}!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Track your learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Level</p>
                <p className="font-medium">Novice Learner</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience Points</CardTitle>
            <CardDescription>Keep learning to earn more XP</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">0</span>
                <span className="text-muted-foreground">/ 100 XP</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: "0%" }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Journeys</CardTitle>
            <CardDescription>Continue where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No active journeys yet. Start learning to track your progress!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

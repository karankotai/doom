"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/context/auth-context";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10" />
      </div>

      <div className="relative max-w-2xl text-center space-y-10">
        {/* Mascot placeholder - you can add an owl icon/image here */}
        <div className="flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-5xl shadow-duo-primary">
            <span role="img" aria-label="owl">🦉</span>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-hero text-foreground">
            Learn. Grow.{" "}
            <span className="text-primary">Level Up.</span>
          </h1>
          <p className="text-xl font-medium text-muted-foreground max-w-lg mx-auto">
            The free, fun, and effective way to learn! Track your progress, earn XP, and unlock achievements.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="min-w-[200px]">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[200px]">
            <Link href="/login">I Already Have an Account</Link>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm font-semibold text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-primary text-lg">✓</span>
            <span>Free to use</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-warning text-lg">⚡</span>
            <span>Earn XP daily</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple text-lg">🏆</span>
            <span>Unlock achievements</span>
          </div>
        </div>
      </div>
    </main>
  );
}

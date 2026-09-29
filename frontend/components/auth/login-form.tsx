"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ApiClientError } from "@/lib/api";
import { Logo } from "../ui/logo";
import { Sparkles } from "lucide-react";

const GOOGLE_LOGO = (
  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTryingDemo, setIsTryingDemo] = useState(false);
  const { login, demoLogin } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login({ email, password });
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.message
          : "An error occurred. Please try again.";
      toast({
        variant: "destructive",
        title: "Login failed",
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <Card className="w-full">
      <CardHeader className="gap-3 text-left">
        <div className="flex items-center gap-3">
          <Logo size="md" />
          <div className="text-caption font-semibold text-muted-foreground">
            Doom · learning that doesn't feel like homework
          </div>
        </div>
        <h1 className="text-h1 text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Log in to pick up where your streak left off.
        </p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4 pt-0">
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={handleTryDemo}
            disabled={isTryingDemo}
          >
            <Sparkles className="h-4 w-4" />
            {isTryingDemo ? "Starting demo…" : "Try it out (no sign up)"}
          </Button>

          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/60" />
            </div>
            <div className="relative flex justify-center text-caption">
              <span className="bg-card px-3 text-muted-foreground font-medium">
                or sign in with email
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3 pt-0">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in…" : "Log in"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full font-semibold"
            onClick={() => {
              window.location.href = `${
                process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"
              }/auth/google`;
            }}
          >
            {GOOGLE_LOGO}
            Continue with Google
          </Button>

          <div className="pt-2 text-label text-muted-foreground">
            New around here?{" "}
            <Link
              href="/register"
              className="font-bold text-primary hover:underline"
            >
              Create an account
            </Link>
            .
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge variant="muted" size="sm">
              <Sparkles className="h-3 w-3" />
              No-account demo mode available
            </Badge>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

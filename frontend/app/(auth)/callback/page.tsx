"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/context/auth-context";

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const code = searchParams.get("code");
    const errorParam = searchParams.get("error");

    if (errorParam) {
      setError("Google sign-in was cancelled.");
      return;
    }

    if (!code) {
      setError("No authorization code received.");
      return;
    }

    loginWithGoogle(code)
      .then(() => router.replace("/dashboard"))
      .catch(() => setError("Google sign-in failed. Please try again."));
  }, [searchParams, loginWithGoogle, router]);

  if (error) {
    return (
      <div className="text-center space-y-4">
        <p className="text-destructive font-semibold">{error}</p>
        <a href="/login" className="text-primary underline text-sm">
          Back to login
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-muted-foreground font-medium">Signing you in...</p>
    </div>
  );
}

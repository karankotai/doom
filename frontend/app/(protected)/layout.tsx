"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { UserMenu } from "@/components/auth/user-menu";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">Learn</span>
            </div>
            <UserMenu />
          </div>
        </header>

        {/* Main content */}
        <main className="container py-6">{children}</main>
      </div>
    </AuthGuard>
  );
}

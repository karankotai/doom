/**
 * Root layout component.
 *
 * Responsibilities:
 * - Define HTML structure and metadata
 * - Wrap all pages with global providers (auth, theme, etc.)
 * - Import global styles
 *
 * This layout applies to all routes in the app.
 */

import type { Metadata } from "next";
import { AuthProvider } from "@/lib/context/auth-context";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Learning Platform",
  description: "Interactive learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

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
import { Nunito } from "next/font/google";
import { AuthProvider } from "@/lib/context/auth-context";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

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
    <html lang="en" className={nunito.variable}>
      <body className="min-h-screen antialiased font-sans">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

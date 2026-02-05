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
      <body>
        {/* TODO: Add providers here (auth, theme, etc.) */}
        {children}
      </body>
    </html>
  );
}

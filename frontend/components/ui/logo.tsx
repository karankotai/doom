import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-24 w-24",
};

export function Logo({ size = "md", className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-xl transition-transform hover:scale-105",
          sizeClasses[size]
        )}
      >
        <Image src="/doom.png" alt="Logo" width={100} height={100} />
      </div>
      {/*
      {showText && (
        <span
          className={cn(
            "font-extrabold tracking-tight text-gradient-primary",
            textSizeClasses[size]
          )}
        >
          learn
        </span>
      )} */}
    </div>
  );
}

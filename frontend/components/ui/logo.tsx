import * as React from "react";
import { cn } from "@/lib/utils";

interface DolphinIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

/**
 * Dolphin icon from game-icons.net by Delapouite
 * License: CC BY 3.0 (https://creativecommons.org/licenses/by/3.0/)
 * Source: https://game-icons.net/1x1/delapouite/dolphin.html
 */
export function DolphinIcon({ className, ...props }: DolphinIconProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      className={cn("h-6 w-6", className)}
      {...props}
    >
      <path d="M123.22 47.23c29.498 15.152 55.025 36.05 55.53 67.366-93.62 83.867-83.862 179.356-97.002 270.34-67.68 55.552-67.57 90.948-60.9 101.227 3.94.743 29.11-25.94 48.326-30.397 14.23-4.094 12.284-15.99 16.273-25.275 2.438 14.55 7.17 22.612 17.133 25.485 12.874 3.36 44.932 28.15 51.53 25.504 1.374-20.382-26.01-63.854-48.028-90.087 41.012-63.28 81.365-136.458 211.162-207.77-3.21-3.706-6.216-6.45-8.8-7.986l9.198-15.472c11.617 6.907 20.522 19.56 29.248 35.033 5.94 10.532 11.528 22.644 16.96 35.117 15.682-32.87 22.983-66.406 16.402-90.254l17.35-4.786a87.287 87.287 0 0 1 1.927 8.83c33.29-4.253 55.718-13.083 85.11-29.322 3.744-2.068 19.054-13.012-.117-16.03 12.62-9.017 7.54-12.063 1.973-15.152-6.486-3.6-20.302-8.948-35.758-8.556-12.124-27.863-39.63-47.772-82.225-47.696-28.532.052-63.842 9.086-105.828 30.688C217.895 27.64 164.92 20.468 123.22 47.23zm286.942 28.74a9 9 0 1 1 0 18 9 9 0 0 1 0-18z" />
    </svg>
  );
}

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

const iconSizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-12 w-12",
};

const textSizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl",
  xl: "text-4xl",
};

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-duo-primary transition-transform hover:scale-105",
          sizeClasses[size]
        )}
      >
        <DolphinIcon className={iconSizeClasses[size]} />
      </div>
      {showText && (
        <span
          className={cn(
            "font-extrabold text-primary tracking-tight",
            textSizeClasses[size]
          )}
        >
          learn
        </span>
      )}
    </div>
  );
}

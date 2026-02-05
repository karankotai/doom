"use client";

import { cn } from "@/lib/utils";

interface LevelBadgeProps {
  level: number;
  title: string;
  xp: number;
  xpToNextLevel: number;
  showProgress?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: {
    container: "gap-2",
    badge: "h-8 w-8 text-sm",
    text: "text-xs",
    progress: "h-1",
  },
  md: {
    container: "gap-3",
    badge: "h-12 w-12 text-lg",
    text: "text-sm",
    progress: "h-1.5",
  },
  lg: {
    container: "gap-4",
    badge: "h-16 w-16 text-2xl",
    text: "text-base",
    progress: "h-2",
  },
};

export function LevelBadge({
  level,
  title,
  xp,
  xpToNextLevel,
  showProgress = true,
  size = "md",
  className,
}: LevelBadgeProps) {
  const progressPercent = Math.min((xp / xpToNextLevel) * 100, 100);
  const styles = sizeClasses[size];

  return (
    <div className={cn("flex items-center", styles.container, className)}>
      {/* Level badge */}
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent font-bold text-primary-foreground shadow-lg",
          styles.badge
        )}
      >
        {level}
      </div>

      {/* Level info */}
      <div className="flex flex-col">
        <span className={cn("font-semibold", styles.text)}>{title}</span>
        {showProgress && (
          <div className="flex flex-col gap-1">
            <span className={cn("text-muted-foreground", styles.text)}>
              {xp} / {xpToNextLevel} XP
            </span>
            <div
              className={cn(
                "w-32 rounded-full bg-secondary",
                styles.progress
              )}
            >
              <div
                className={cn(
                  "rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300",
                  styles.progress
                )}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

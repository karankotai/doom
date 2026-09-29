import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
  {
    variants: {
      variant: {
        default:
          "border-primary/25 bg-primary/10 text-primary",
        secondary:
          "border-secondary/25 bg-secondary/10 text-secondary-foreground/95",
        accent:
          "border-accent/25 bg-accent/10 text-accent-foreground",
        warning:
          "border-warning/30 bg-warning/10 text-warning",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive",
        purple:
          "border-purple/30 bg-purple/10 text-purple-foreground",
        outline:
          "border-border text-foreground",
        muted:
          "border-border/60 bg-muted text-muted-foreground",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px] gap-1",
        default: "px-2.5 py-1 text-xs gap-1.5",
        lg: "px-3 py-1.5 text-sm gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

function Badge({
  className,
  variant,
  size,
  iconLeft,
  iconRight,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {iconLeft}
      {children && <span>{children}</span>}
      {iconRight}
    </div>
  );
}

export { Badge, badgeVariants };

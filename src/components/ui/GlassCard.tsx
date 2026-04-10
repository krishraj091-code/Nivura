import * as React from "react";
import { cn } from "@/src/lib/utils";
import { motion, HTMLMotionProps } from "motion/react";

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  hoverEffect?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverEffect = false, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverEffect ? { y: -5, scale: 1.01 } : undefined}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "bg-card rounded-[2rem] p-6 sm:p-8 shadow-sm border border-border relative overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="relative z-10">{props.children}</div>
      </motion.div>
    );
  }
);
GlassCard.displayName = "GlassCard";

export { GlassCard };

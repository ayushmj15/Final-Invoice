"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

type MotionButtonProps = Omit<HTMLMotionProps<"button">, keyof ButtonProps> & ButtonProps;

const Button = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-[#FF6B2C] text-white hover:bg-[#E94E1B] shadow-[0_0_20px_-5px_rgba(255,107,44,0.4)] hover:shadow-[0_0_25px_-5px_rgba(255,107,44,0.6)] border border-transparent",
      secondary: "bg-white text-zinc-900 hover:bg-zinc-100 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-700",
      outline: "bg-transparent text-zinc-900 border border-zinc-300 hover:bg-zinc-100 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800",
      ghost: "bg-transparent text-zinc-900 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800",
      dark: "bg-zinc-900 text-white hover:bg-zinc-800 border border-transparent dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-11 px-6 text-base",
      lg: "h-14 px-8 text-lg font-medium",
      icon: "h-11 w-11 flex items-center justify-center",
    };

    return (
      // @ts-expect-error - React 19 and Framer Motion type conflict
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B2C] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button };

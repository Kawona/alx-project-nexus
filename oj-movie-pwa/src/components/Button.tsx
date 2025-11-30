import React from "react";
import { cn } from "../utils/cn";
import type { IconType } from "react-icons";

type ButtonVariant = "primary" | "secondary" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconType;
  fullWidth?: boolean;
}

const baseStyles =
  "flex items-center justify-center gap-3 rounded-md font-semibold transition-all duration-200 border border-gray-600 active:scale-[0.98]";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-gray-800/50 text-blue-400 hover:bg-gray-800",
  secondary: "bg-gray-700/30 text-blue-400 hover:bg-gray-700",
  icon: "bg-gray-700/30 text-blue-400 hover:bg-gray-700 border-none",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-xs md:text-sm",
  md: "px-4 py-2 text-sm md:text-base",
  lg: "px-5 py-3 text-base md:text-lg",
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  fullWidth,
  className,
  ...props
}) => {
  const isIconOnly = variant === "icon" && !children;

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        isIconOnly && "p-2 text-xl md:text-2xl",
        className
      )}
      {...props}
    >
      {Icon && <Icon />}
      {!isIconOnly && children}
    </button>
  );
};

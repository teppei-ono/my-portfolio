import type React from "react";

export type LinkButtonVariant = "primary" | "secondary";
export type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: LinkButtonVariant;
  ariaLabel?: string;
};
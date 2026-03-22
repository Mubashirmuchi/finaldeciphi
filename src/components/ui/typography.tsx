import React from "react";

export const typography = {
  display:
    "text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight",
  "heading-xl": "text-4xl md:text-5xl font-bold leading-tight tracking-tight",
  "heading-lg":
    "text-3xl md:text-4xl font-semibold leading-snug tracking-tight",
  "heading-md": "text-2xl md:text-3xl font-semibold leading-snug",
  "heading-sm": "text-xl md:text-2xl font-semibold leading-snug",
  "body-lg": "text-lg md:text-xl font-normal leading-relaxed",
  body: "text-base font-normal leading-relaxed",
  "body-sm": "text-sm font-normal leading-relaxed",
  caption: "text-xs font-normal leading-normal",
  overline: "text-xs font-semibold uppercase tracking-widest",
} as const;

type Variant = keyof typeof typography;

type TypographyProps = {
  variant?: Variant;
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export function Typography({
  variant = "body",
  as: Component = "p",
  className = "",
  children,
}: TypographyProps) {
  return (
    <Component className={`${typography[variant]} ${className}`}>
      {children}
    </Component>
  );
}

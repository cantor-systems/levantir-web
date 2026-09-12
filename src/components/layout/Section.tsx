import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Section<T extends ElementType = "section">({
  as,
  children,
  className = "",
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";

  return (
    <Component
      className={`py-16 md:py-24 lg:py-32 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

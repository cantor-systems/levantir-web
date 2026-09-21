import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({
  as: Component = "section",
  children,
  className = "",
  ...props
}: SectionProps) {
  return (
    <Component
      className={`py-14 sm:py-20 md:py-24 lg:py-28 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

import React from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export function Container({
  as: Component = "div",
  children,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={`mx-auto w-full max-w-[1320px] px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

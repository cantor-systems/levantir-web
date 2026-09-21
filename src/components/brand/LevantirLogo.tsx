import React from 'react';

interface LevantirLogoProps {
  variant?: 'dark' | 'light' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'responsive';
  showDescriptor?: boolean;
  showWordmark?: boolean;
  className?: string;
}

export function LevantirIsotipo({
  className = "w-8 h-8",
  color = "currentColor",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M38 12C38 12 36.5 13.8 33 16.5C31 18 27.5 19 23 19.5C24.5 21 28 23 33 23C36 23 39 21.8 41 20C41 20 40 23.5 37 27C34 30.5 28 34.5 23.5 36C26 36.5 31 37.5 37 36C44 34.2 52 28.5 60 21C67 14.5 73 8 76 5C76 5 74 15 67 27C60.5 38 48 50 35 55C32 56.2 26 58 20 57.5C23 58.5 29 60 36 59C45 57.7 58 50 67 40C75 31 82 20 84 15C84 15 82 28 73 43C65 56 50 69 35 74C30 75.7 23 77 17 76C20 77.5 27 79.5 34 78.5C45 76.9 60 67 70 55C79 44 87 31 89 25C89 25 87 40 76 58C67 72 49 86 31 91C25 92.7 18 93.5 14 93C17 94.5 24 96 32 94.5C46 91.8 63 79 73 66C82 54 89 40 91 32C91 32 89 50 75 72C63 89 43 99 26 99C23 99 18 98.5 12 97C14 95.5 16 93.5 17 90C18.5 85 18 78 17 73C16 67 14 62 13 58C12 53 13 48 14 44C15 40 17 36 17 33C17 29 15 25 14 22C17 21 21 20.5 24 19C29 16.5 34 14 38 12Z"
        fill={color}
      />
    </svg>
  );
}

export function LevantirLogo({
  variant = 'dark',
  size = 'responsive',
  className = "",
}: LevantirLogoProps) {
  const sizeClasses = {
    sm: "h-7 sm:h-8",
    md: "h-8 sm:h-9 md:h-10",
    lg: "h-10 sm:h-11 md:h-12",
    responsive: "h-8 sm:h-9 md:h-10 lg:h-[50px] xl:h-[52px] 2xl:h-[54px]",
  }[size];

  const imageSrc = variant === 'light'
    ? '/LEVANTIR_Logo_Reference_Light.webp'
    : '/LEVANTIR_Logo_Reference.webp';

  return (
    <img
      src={imageSrc}
      alt="LEVANTIR"
      className={`${sizeClasses} w-auto object-contain select-none transition-opacity hover:opacity-95 ${className}`}
      width={1060}
      height={250}
      loading="eager"
      decoding="async"
    />
  );
}

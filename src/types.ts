export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  imageUrl: string;
  altText: string;
}

export interface MethodologyStepItem {
  number: string;
  title: string;
  description: string;
}

export interface PrincipleItem {
  id: string;
  title: string;
  description: string;
  iconType: 'analysis' | 'protection' | 'solutions' | 'accompaniment';
}

export interface InsightPreviewItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  href: string;
  imageUrl: string;
  readTime?: string;
}

export interface HeroSlide {
  id: string;
  theme: string;
  imageUrl: string;
  altText: string;
  labelCategory: string;
  labelTagline: string;
}

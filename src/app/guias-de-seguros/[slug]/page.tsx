import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuiaArticle } from "@/components/guias/GuiaArticle";
import { siteConfig } from "@/config/site";
import {
  GUIAS_BASE_PATH,
  getGuiaBySlug,
  guiasDeSeguros,
} from "@/content/guias-de-seguros";

type GuiaPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return guiasDeSeguros.map((guia) => ({ slug: guia.slug }));
}

export async function generateMetadata({
  params,
}: GuiaPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guia = getGuiaBySlug(slug);
  if (!guia) return {};

  const url = `${siteConfig.url}${GUIAS_BASE_PATH}/${guia.slug}`;

  return {
    title: { absolute: guia.seoTitle },
    description: guia.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: guia.seoTitle,
      description: guia.metaDescription,
      locale: "es_MX",
      siteName: "LEVANTIR",
      images: [{ url: `${siteConfig.url}${guia.image.src}`, alt: guia.image.alt }],
    },
  };
}

export default async function GuiaPage({ params }: GuiaPageProps) {
  const { slug } = await params;
  const guia = getGuiaBySlug(slug);
  if (!guia) notFound();

  return <GuiaArticle guia={guia} />;
}

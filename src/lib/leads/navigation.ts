import { ProductId, GeneralTopicId } from "./config";

/**
 * Parses an existing CTA href (e.g. "/?advisory=true&topic=vida") and rebuilds it
 * using the current pathname and search params, preserving unrelated query params.
 */
export function buildAdvisoryUrl(
  originalHref: string,
  currentPathname: string,
  currentSearchParams: string | URLSearchParams
): string {
  // Only intercept if it's explicitly targeting the advisory modal
  if (!originalHref.includes("advisory=true")) {
    return originalHref;
  }

  let topic: string | null = null;
  
  try {
    // Determine if it has a topic by parsing. Use a dummy base since originalHref might be relative.
    const originalUrl = new URL(originalHref, "http://localhost");
    topic = originalUrl.searchParams.get("topic");
  } catch (e) {
    // Fallback if it fails
  }

  const params = new URLSearchParams(currentSearchParams.toString());
  params.set("advisory", "true");
  
  if (topic) {
    params.set("topic", topic);
  }

  const prefix = currentPathname || "/";
  const qs = params.toString();
  return `${prefix}${qs ? `?${qs}` : ""}`;
}

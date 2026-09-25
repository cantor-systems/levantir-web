import { isValidProductId, isValidGeneralTopicId } from "./context";

/**
 * Parses an existing CTA href (e.g. "/?advisory=true&topic=vida") and rebuilds it
 * using the current pathname and search params, preserving unrelated query params.
 *
 * Advisory-owned params forwarded from the original href:
 *   - topic   (GeneralTopicId)
 *   - product (ProductId)
 *
 * They are validated before being written to the URL.
 * Unknown/invalid values are silently ignored.
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
  let product: string | null = null;

  try {
    // Use a dummy base since originalHref might be relative.
    const originalUrl = new URL(originalHref, "http://localhost");
    topic = originalUrl.searchParams.get("topic");
    product = originalUrl.searchParams.get("product");
  } catch {
    // Fallback if parsing fails
  }

  const params = new URLSearchParams(currentSearchParams.toString());
  params.set("advisory", "true");

  // Only write validated values into the URL
  if (topic && isValidGeneralTopicId(topic)) {
    params.set("topic", topic);
  }
  if (product && isValidProductId(product)) {
    params.set("product", product);
  }

  const prefix = currentPathname || "/";
  const qs = params.toString();
  return `${prefix}${qs ? `?${qs}` : ""}`;
}

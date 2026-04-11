import sanitizeHtml from "sanitize-html";

/**
 * 現状は <br> のみ許可（それ以外は除去）
 */
export function setSanitizeRichText(html: string) {
  return sanitizeHtml(html, {
    allowedTags: ["br"],
    allowedAttributes: {},
  });
}
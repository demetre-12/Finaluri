export function getOptimizedImageUrl(originalUrl, width = 400, quality = 80) {
  if (!originalUrl) return "";

  if (
    originalUrl.includes("via.placeholder.com") ||
    originalUrl.startsWith("data:")
  ) {
    return originalUrl;
  }

  return `https://images.weserv.nl/?url=${encodeURIComponent(originalUrl)}&w=${width}&output=webp&q=${quality}`;
}

export function getOptimizedImageUrl(originalUrl, width = 200, quality = 65) {
  if (!originalUrl) return "";

  if (
    originalUrl.includes("via.placeholder.com") ||
    originalUrl.startsWith("data:")
  ) {
    return originalUrl;
  }

  return `https://images.weserv.nl/?url=${encodeURIComponent(originalUrl)}&w=${width}&h=${width}&fit=contain&output=webp&q=${quality}`;
}

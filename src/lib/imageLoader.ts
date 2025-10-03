export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const q = quality || 75;

  // If the src is a dynamic product image path, route it through our API
  if (src.startsWith('/products/')) {
    return `/api/images${src}?w=${width}&q=${q}`;
  }
  
  // For all other static assets, return the src as is.
  // Next.js will handle these directly from the public folder or build output.
  return src;
}

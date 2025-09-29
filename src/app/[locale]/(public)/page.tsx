import Hero from '@/components/public/storefront/Hero';
import CategoryShowcase from '@/components/public/storefront/CategoryShowcase';
import FeaturedProducts from '@/components/public/storefront/FeaturedProducts';
import { Category, Product } from '@/types';

async function getStorefrontData() {
  // In a real app, you'd fetch from your absolute API URL
  // For simplicity here, we're assuming it can resolve locally.
  // A real implementation would use http://localhost:3000/api/storefront or similar.
  // This approach is illustrative for the CLI environment.
  try {
    const res = await fetch('http://localhost:3000/api/storefront', { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch storefront data');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    // Return empty arrays on error to prevent build failure
    return { categories: [], featuredProducts: [] };
  }
}

export default async function HomePage() {
  const { categories, featuredProducts }: { categories: Category[], featuredProducts: Product[] } = await getStorefrontData();

  return (
    <main>
      <Hero />
      <CategoryShowcase categories={categories} />
      <FeaturedProducts products={featuredProducts} />
    </main>
  );
}
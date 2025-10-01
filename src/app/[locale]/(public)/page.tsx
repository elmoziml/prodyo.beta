import Hero from '@/components/public/storefront/Hero';
import CategorySection from '@/components/public/storefront/CategorySection';
import { CategoryWithProducts } from '@/types';

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
    return { categoriesWithProducts: [] };
  }
}

export default async function HomePage() {
  const { categoriesWithProducts }: { categoriesWithProducts: CategoryWithProducts[] } = await getStorefrontData();

  return (
    <main>
      <Hero />
      
      {/* Display categories as sections with their products */}
      {categoriesWithProducts.length > 0 ? (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {categoriesWithProducts.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-body-dark py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              لا توجد منتجات متاحة حالياً
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
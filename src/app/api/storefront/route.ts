
import { NextResponse } from 'next/server';
import { queryDB } from '@/lib/utils/db';
import { Product, Category } from '@/types';

interface CategoryWithProducts extends Category {
  products: Product[];
}

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  try {
    // Fetch all categories
    const categoriesResult = await queryDB('SELECT id, name, description FROM categories ORDER BY name');
    const categories: Category[] = categoriesResult.rows;

    // Fetch all published products
    const productsResult = await queryDB(
      'SELECT id, name, description, price, stock, category_id, available_options, images, kind, is_published, created_at, updated_at FROM products WHERE is_published = TRUE ORDER BY created_at DESC'
    );
    const products: Product[] = productsResult.rows;

    // Group products by category
    const categoriesWithProducts: CategoryWithProducts[] = categories
      .map(category => ({
        ...category,
        products: products.filter(product => product.category_id === category.id)
      }))
      .filter(category => category.products.length > 0); // Only categories with published products

    return NextResponse.json({
      categoriesWithProducts,
    });
  } catch (error) {
    console.error('Error fetching storefront data:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Product, Category } from '@/types';

const productsPath = path.join(process.cwd(), 'src/lib/data/products.json');
const categoriesPath = path.join(process.cwd(), 'src/lib/data/categories.json');

function readJsonFile(filePath: string) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

interface CategoryWithProducts extends Category {
  products: Product[];
}

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  try {
    const products: Product[] = readJsonFile(productsPath);
    const categories: Category[] = readJsonFile(categoriesPath);

    // Group products by category and only include categories that have products
    const categoriesWithProducts: CategoryWithProducts[] = categories
      .map(category => ({
        ...category,
        products: products.filter(product => product.category_id === category.id)
      }))
      .filter(category => category.products.length > 0); // Only categories with products

    return NextResponse.json({
      categoriesWithProducts,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

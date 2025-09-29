
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Product, Category } from '@/types';

const productsPath = path.join(process.cwd(), 'src/lib/data/product-details.json');
const categoriesPath = path.join(process.cwd(), 'src/lib/data/categories.json');

function readJsonFile(filePath: string) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return a default structure
    if (filePath.endsWith('product-details.json')) return {};
    return [];
  }
}

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  try {
    const allProductDetails: Record<string, Product> = readJsonFile(productsPath);
    const categories: Category[] = readJsonFile(categoriesPath);

    // Convert the product details object to an array
    const productsArray = Object.values(allProductDetails);

    // For the storefront, let's feature some products (e.g., the first 8)
    const featuredProducts = productsArray.slice(0, 8);

    return NextResponse.json({
      categories,
      featuredProducts,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

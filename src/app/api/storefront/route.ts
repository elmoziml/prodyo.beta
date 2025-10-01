
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

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

  try {
    const products: Product[] = readJsonFile(productsPath);
    const categories: Category[] = readJsonFile(categoriesPath);

    // For the storefront, let's feature some products (e.g., the first 8)
    const featuredProducts = products.slice(0, 8);

    return NextResponse.json({
      categories,
      featuredProducts,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

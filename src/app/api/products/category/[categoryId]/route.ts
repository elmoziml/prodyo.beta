import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const productsPath = path.join(process.cwd(), 'src/lib/data/products.json');

function readProductsFile() {
  const data = fs.readFileSync(productsPath, 'utf-8');
  return JSON.parse(data);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const { categoryId } = await params;
    
    // Read all products
    const products = readProductsFile();
    
    // Filter products by category_id
    const filteredProducts = products.filter(
      (product: any) => product.category_id === categoryId
    );
    
    // Return filtered products
    return NextResponse.json(filteredProducts, { status: 200 });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products by category' },
      { status: 500 }
    );
  }
}

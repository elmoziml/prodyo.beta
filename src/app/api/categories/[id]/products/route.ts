
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types';

const productsPath = path.join(process.cwd(), 'src/lib/data/products.json');

function readJsonFile(filePath: string) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  try {
    const products: Product[] = readJsonFile(productsPath);
    const categoryProducts = products.filter(p => p.category_id === params.id);

    return NextResponse.json(categoryProducts);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

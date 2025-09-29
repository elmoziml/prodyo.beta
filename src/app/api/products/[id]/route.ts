
import { NextResponse } from 'next/server';
import products from '@/lib/data/product-details.json';
import { Product } from '@/types';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const productId = params.id;
  const product = (products as Record<string, Product>)[productId];

  if (product) {
    return NextResponse.json(product);
  } else {
    return new NextResponse('Product not found', { status: 404 });
  }
}

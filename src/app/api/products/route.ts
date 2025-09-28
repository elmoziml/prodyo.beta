
import { NextResponse } from 'next/server';
import products from '@/lib/data/products.json';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const newProductData = await request.json();
    
    // Simulate database insertion
    const newProduct = {
      ...newProductData,
      id: `PROD${Date.now()}` // Create a pseudo-unique ID
    };

    // In a real app, you would save this to your database.
    // For this simulation, we just return the created object.

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

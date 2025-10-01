
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types';
import { deleteProductImages } from '@/lib/utils/fileUpload';

const productsPath = path.join(process.cwd(), 'src/lib/data/products.json');

function readProductsFile(): Product[] {
  try {
    const data = fs.readFileSync(productsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

function writeProductsFile(data: any) {
  fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await new Promise(resolve => setTimeout(resolve, 300));
  const products = readProductsFile();
  const product = products.find(p => p.id === params.id);

  if (product) {
    return NextResponse.json(product);
  } else {
    return new NextResponse('Product not found', { status: 404 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedProductData = await request.json();
    const { id } = params;

    const products = readProductsFile();
    const productIndex = products.findIndex((p: Product) => p.id === id);

    if (productIndex === -1) {
      return new NextResponse('Product not found', { status: 404 });
    }

    products[productIndex] = { ...products[productIndex], ...updatedProductData };
    writeProductsFile(products);

    return NextResponse.json(products[productIndex]);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    let products = readProductsFile();
    const productIndex = products.findIndex((p: Product) => p.id === id);

    if (productIndex === -1) {
      return new NextResponse('Product not found', { status: 404 });
    }

    products = products.filter((p: Product) => p.id !== id);
    writeProductsFile(products);

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

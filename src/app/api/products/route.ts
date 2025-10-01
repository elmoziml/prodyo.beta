
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const productsPath = path.join(process.cwd(), 'src/lib/data/products.json');

function readProductsFile() {
  const data = fs.readFileSync(productsPath, 'utf-8');
  return JSON.parse(data);
}

function writeProductsFile(data: any) {
  fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));
}

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const products = readProductsFile();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const newProductData = await request.json();
    const productId = `prod-${Date.now()}`;

    const newProduct = {
      ...newProductData,
      id: productId,
    };

    const products = readProductsFile();
    products.push(newProduct);
    writeProductsFile(products);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

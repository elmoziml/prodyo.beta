
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Product } from '@/types';

const productsPath = path.join(process.cwd(), 'src/lib/data/products.json');
const productDetailsPath = path.join(process.cwd(), 'src/lib/data/product-details.json');

function readJsonFile(filePath: string) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return a default structure
    if (filePath.endsWith('products.json')) return [];
    if (filePath.endsWith('product-details.json')) return {};
    return null;
  }
}

function writeJsonFile(filePath: string, data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await new Promise(resolve => setTimeout(resolve, 300));
  const products = readJsonFile(productDetailsPath) as Record<string, Product>;
  const product = products[params.id];

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

    // Update details in product-details.json
    const allProductDetails = readJsonFile(productDetailsPath);
    if (!allProductDetails[id]) {
      return new NextResponse('Product not found', { status: 404 });
    }
    allProductDetails[id] = { ...allProductDetails[id], ...updatedProductData };
    writeJsonFile(productDetailsPath, allProductDetails);

    // Update summary in products.json
    const allProductsSummary = readJsonFile(productsPath);
    const productIndex = allProductsSummary.findIndex((p: Product) => p.id === id);
    if (productIndex !== -1) {
      allProductsSummary[productIndex] = {
        ...allProductsSummary[productIndex],
        name: updatedProductData.name,
        category_id: updatedProductData.category_id,
        price: updatedProductData.price,
        stock: updatedProductData.stock,
      };
      writeJsonFile(productsPath, allProductsSummary);
    }

    return NextResponse.json(allProductDetails[id]);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // Delete from product-details.json
    const allProductDetails = readJsonFile(productDetailsPath);
    if (!allProductDetails[id]) {
      return new NextResponse('Product not found', { status: 404 });
    }
    delete allProductDetails[id];
    writeJsonFile(productDetailsPath, allProductDetails);

    // Delete from products.json
    let allProductsSummary = readJsonFile(productsPath);
    allProductsSummary = allProductsSummary.filter((p: Product) => p.id !== id);
    writeJsonFile(productsPath, allProductsSummary);

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

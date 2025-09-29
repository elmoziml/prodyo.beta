
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const productsPath = path.join(process.cwd(), 'src/lib/data/products.json');
const productDetailsPath = path.join(process.cwd(), 'src/lib/data/product-details.json');

function readJsonFile(filePath: string) {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

function writeJsonFile(filePath: string, data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const products = readJsonFile(productsPath);
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const newProductData = await request.json();
    const productId = `prod-${Date.now()}`;

    // Create the full product object for product-details.json
    const fullProduct = {
      ...newProductData,
      id: productId,
    };

    // Create the summary product object for products.json
    const summaryProduct = {
      id: productId,
      name: newProductData.name,
      category_id: newProductData.category_id,
      price: newProductData.price,
      stock: newProductData.stock,
    };

    // Update product-details.json
    const allProductDetails = readJsonFile(productDetailsPath);
    allProductDetails[productId] = fullProduct;
    writeJsonFile(productDetailsPath, allProductDetails);

    // Update products.json
    const allProductsSummary = readJsonFile(productsPath);
    allProductsSummary.push(summaryProduct);
    writeJsonFile(productsPath, allProductsSummary);

    return NextResponse.json(fullProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

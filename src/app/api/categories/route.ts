
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Category } from '@/types';

const categoriesPath = path.join(process.cwd(), 'src/lib/data/categories.json');

function readCategoriesFile(): Category[] {
  const data = fs.readFileSync(categoriesPath, 'utf-8');
  return JSON.parse(data);
}

function writeCategoriesFile(data: Category[]) {
  fs.writeFileSync(categoriesPath, JSON.stringify(data, null, 2));
}

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));
  const categories = readCategoriesFile();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  try {
    const { name, description } = await request.json();
    const categories = readCategoriesFile();

    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      description,
    };

    categories.push(newCategory);
    writeCategoriesFile(categories);

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

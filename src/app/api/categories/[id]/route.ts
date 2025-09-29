
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

// GET a single category by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const categories = readCategoriesFile();
    const category = categories.find(c => c.id === params.id);

    if (!category) {
      return new NextResponse('Category not found', { status: 404 });
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}


// UPDATE a category
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { name, description } = await request.json();
    const categories = readCategoriesFile();
    const categoryIndex = categories.findIndex(c => c.id === params.id);

    if (categoryIndex === -1) {
      return new NextResponse('Category not found', { status: 404 });
    }

    const updatedCategory = { ...categories[categoryIndex], name, description };
    categories[categoryIndex] = updatedCategory;
    writeCategoriesFile(categories);

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

// DELETE a category
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const categories = readCategoriesFile();
    const updatedCategories = categories.filter(c => c.id !== params.id);

    if (categories.length === updatedCategories.length) {
      return new NextResponse('Category not found', { status: 404 });
    }

    writeCategoriesFile(updatedCategories);

    return new NextResponse(null, { status: 204 }); // No Content
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

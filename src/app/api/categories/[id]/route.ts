
import { NextResponse } from 'next/server';
import { queryDB } from '@/lib/utils/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    const { id } = params;
    const result = await queryDB('SELECT id, name, description FROM categories WHERE id = $1', [id]);

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0]);
    } else {
      return new NextResponse('Category not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching category:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, description } = await request.json();

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const result = await queryDB(
      'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING id, name, description',
      [name, description, id]
    );

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0]);
    } else {
      return new NextResponse('Category not found', { status: 404 });
    }
  } catch (error: any) {
    console.error('Error updating category:', error);
    if (error.code === '23505') { // Unique violation error code
      return new NextResponse('Category with this name already exists', { status: 409 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const result = await queryDB('DELETE FROM categories WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length > 0) {
      return new NextResponse(null, { status: 204 });
    } else {
      return new NextResponse('Category not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

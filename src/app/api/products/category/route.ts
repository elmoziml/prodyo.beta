import { NextResponse } from 'next/server';
import { queryDB } from '@/lib/utils/db';

export async function GET(request: Request) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('id');

    let query = 'SELECT id, name, description, price, stock, category_id, available_options, images, kind, is_published, created_at, updated_at FROM products';
    const queryParams = [];

    if (categoryId) {
      query += ' WHERE category_id = $1';
      queryParams.push(categoryId);
    }
    query += ' ORDER BY created_at DESC';

    const result = await queryDB(query, queryParams);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import { queryDB } from '@/lib/utils/db';
import { deleteProductImages } from '@/lib/utils/fileUpload'; // Keep for later use

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    const { id } = params;
    const result = await queryDB(
      'SELECT id, name, description, price, stock, category_id, available_options, images, kind, is_published, created_at, updated_at FROM products WHERE id = $1',
      [id]
    );

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0]);
    } else {
      return new NextResponse('Product not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const updatedFields = await request.json();

    const setClauses: string[] = [];
    const queryParams: any[] = [];
    let paramIndex = 1;

    for (const key in updatedFields) {
      if (updatedFields.hasOwnProperty(key)) {
        let value = updatedFields[key];
        if (key === 'available_options' || key === 'images') {
          value = JSON.stringify(value); // Stringify JSONB fields
          setClauses.push(`${key} = $${paramIndex}::jsonb`);
        } else if (key === 'category_id' && value === '') { // Handle empty category_id as NULL
          value = null;
          setClauses.push(`${key} = $${paramIndex}`);
        } else {
          setClauses.push(`${key} = $${paramIndex}`);
        }
        queryParams.push(value);
        paramIndex++;
      }
    }

    if (setClauses.length === 0) {
      return new NextResponse('No fields to update', { status: 400 });
    }

    setClauses.push(`updated_at = NOW()`); // Automatically update timestamp

    queryParams.push(id); // Add id for WHERE clause

    const result = await queryDB(
      `UPDATE products SET ${setClauses.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      queryParams
    );

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0]);
    } else {
      return new NextResponse('Product not found', { status: 404 });
    }
  } catch (error: any) {
    console.error('Error updating product:', error);
    if (error.code === '23505') { // Unique violation error code
      return new NextResponse('Product with this name already exists', { status: 409 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // First, fetch the product to get image paths if needed for deletion
    const productResult = await queryDB('SELECT images FROM products WHERE id = $1', [id]);
    if (productResult.rows.length > 0) {
      const productImages = productResult.rows[0].images || [];
      // Delete images from file system
      if (productImages.length > 0) {
        await deleteProductImages(id, productImages);
      }
    }

    const result = await queryDB('DELETE FROM products WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length > 0) {
      return new NextResponse(null, { status: 204 });
    } else {
      return new NextResponse('Product not found', { status: 404 });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

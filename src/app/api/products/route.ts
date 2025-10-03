import { NextResponse } from 'next/server';
import { queryDB } from '@/lib/utils/db';
import fs from 'fs';
import path from 'path';
import { UPLOAD_BASE_DIR, ensureDirectoryExists, deleteEmptyDirectory } from '@/lib/utils/fileUpload';

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const result = await queryDB(
      'SELECT id, name, description, price, stock, category_id, available_options, images, kind, is_published, created_at, updated_at FROM products ORDER BY created_at DESC'
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const {
      name,
      description,
      price,
      stock,
      category_id,
      available_options = {},
      images = [], // This will contain temporary paths like /products/temp-123/image.jpg
      kind = 'PHYSICAL',
      is_published = false,
    } = await request.json();

    if (!name || !price || !stock) {
      return new NextResponse('Name, price, and stock are required', { status: 400 });
    }

    // 1. Insert product into DB with temporary image paths
    const insertResult = await queryDB(
      `INSERT INTO products (
        name, description, price, stock, category_id, available_options, images, kind, is_published
      ) VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7::jsonb, $8, $9) RETURNING *`,
      [
        name,
        description,
        price,
        stock,
        category_id,
        JSON.stringify(available_options),
        JSON.stringify(images),
        kind,
        is_published,
      ]
    );
    const newProduct = insertResult.rows[0];
    const newProductId = newProduct.id;

    // 2. Handle image relocation if images were uploaded temporarily
    if (images.length > 0) {
      // Extract the temporary product ID from the first image path
      // Assuming all temporary images belong to the same tempProductId
      const tempPathMatch = images[0].match(/\/products\/(temp-[^/]+)/);
      const tempProductId = tempPathMatch ? tempPathMatch[1] : null;

      if (tempProductId) {
        const tempProductDir = path.join(UPLOAD_BASE_DIR, 'products', tempProductId);
        const newProductDir = path.join(UPLOAD_BASE_DIR, 'products', String(newProductId));

        ensureDirectoryExists(newProductDir);

        const newImagePaths: string[] = [];
        for (const tempImagePath of images) {
          const fileName = path.basename(tempImagePath);
          const oldFullPath = path.join(UPLOAD_BASE_DIR, tempImagePath);
          const newFullPath = path.join(newProductDir, fileName);

          if (fs.existsSync(oldFullPath)) {
            fs.renameSync(oldFullPath, newFullPath);
            newImagePaths.push(`/products/${newProductId}/${fileName}`);
          } else {
            console.warn(`Temporary image not found: ${oldFullPath}`);
            // If image not found, keep the original path or handle as error
            newImagePaths.push(tempImagePath); 
          }
        }

        // Update the product in the database with the new permanent image paths
        await queryDB(
          'UPDATE products SET images = $1::jsonb WHERE id = $2 RETURNING *'
          , [JSON.stringify(newImagePaths), newProductId]
        );
        newProduct.images = newImagePaths; // Update the returned product object

        // Clean up the temporary directory
        deleteEmptyDirectory(tempProductDir);
      }
    }

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    // If an error occurs after inserting but before image relocation, consider rolling back or cleaning up
    if (error.code === '23505') { // Unique violation error code
      return new NextResponse('Product with this name already exists', { status: 409 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
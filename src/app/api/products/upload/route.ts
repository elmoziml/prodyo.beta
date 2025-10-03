import { NextRequest, NextResponse } from 'next/server';
import { saveUploadedFile } from '@/lib/utils/fileUpload';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const productId = formData.get('productId') as string; // This will be the tempProductId from frontend

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Save file and get relative path (e.g., /products/temp-123/image.jpg)
    const imagePath = await saveUploadedFile(file, productId);

    // Construct the imageUrl using the new image serving API route
    const imageUrl = `/api/images${imagePath}`;

    // Return success with image path and URL
    return NextResponse.json({
      success: true,
      imagePath, // This is the relative path from UPLOAD_BASE_DIR
      imageUrl,  // This is the full URL to access the image via the API
      fileName: imagePath.split('/').pop(),
    }, { status: 201 });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image' },
      { status: 500 }
    );
  }
}

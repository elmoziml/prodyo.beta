import { NextRequest, NextResponse } from 'next/server';
import { saveUploadedFile } from '@/lib/utils/fileUpload';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const productId = formData.get('productId') as string;

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

    // Save file and get relative path
    const imagePath = await saveUploadedFile(file, productId);

    // Return success with image path
    return NextResponse.json({
      success: true,
      imagePath,
      imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}${imagePath}`,
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

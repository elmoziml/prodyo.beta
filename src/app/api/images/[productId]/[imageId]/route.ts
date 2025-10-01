import { NextRequest, NextResponse } from 'next/server';
import { deleteImageFile, deleteEmptyDirectory, getProductImagesDir } from '@/lib/utils/fileUpload';
import fs from 'fs';
import path from 'path';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string; imageId: string }> }
) {
  try {
    const { productId, imageId } = await params;

    if (!productId || !imageId) {
      return NextResponse.json(
        { error: 'Product ID and Image ID are required' },
        { status: 400 }
      );
    }

    // Construct image path
    const imagePath = `/uploads/products/${productId}/${imageId}`;
    
    // Delete the image file
    deleteImageFile(imagePath);

    // Check if directory is empty and delete if so
    const productDir = getProductImagesDir(productId);
    deleteEmptyDirectory(productDir);

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
      deletedPath: imagePath,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Delete image error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete image' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import mime from 'mime-types';

const UPLOAD_BASE_DIR = path.join(process.cwd(), 'uploads');

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const imagePathSegments = params.path;
    const fullImagePath = path.join(UPLOAD_BASE_DIR, ...imagePathSegments);

    // Check if the file exists
    if (!fs.existsSync(fullImagePath)) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // Read the file
    const fileBuffer = fs.readFileSync(fullImagePath);

    // Determine content type
    const contentType = mime.lookup(fullImagePath) || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache images aggressively
      },
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

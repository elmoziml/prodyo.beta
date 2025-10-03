import fs from 'fs';
import path from 'path';

// Define the base directory for all uploads, outside of the public folder
export const UPLOAD_BASE_DIR = path.join(process.cwd(), 'uploads');

// Allowed image types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

/**
 * Check if file type is a valid image
 */
export function isValidImageType(file: File): boolean {
  return ALLOWED_IMAGE_TYPES.includes(file.type);
}

/**
 * Check if file size is within limit
 * @param file - File to check
 * @param maxSizeInMB - Maximum size in megabytes (default: 5MB)
 */
export function isValidImageSize(file: File, maxSizeInMB: number = 5): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
}

/**
 * Generate unique file name with timestamp
 */
export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = path.extname(originalName).toLowerCase();
  
  // Validate extension
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    throw new Error(`Invalid file extension: ${extension}`);
  }
  
  return `image-${timestamp}-${randomString}${extension}`;
}

/**
 * Ensure directory exists, create if not
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Delete directory if empty
 */
export function deleteEmptyDirectory(dirPath: string): void {
  try {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      // Only delete if empty (excluding .gitkeep)
      if (files.length === 0 || (files.length === 1 && files[0] === '.gitkeep')) {
        fs.rmSync(dirPath, { recursive: true, force: true });
      }
    }
  } catch (error) {
    console.error('Error deleting directory:', error);
  }
}

/**
 * Delete all images for a product
 */
export async function deleteProductImages(productId: string): Promise<void> {
  const productDir = path.join(UPLOAD_BASE_DIR, 'products', productId);
  
  try {
    if (fs.existsSync(productDir)) {
      fs.rmSync(productDir, { recursive: true, force: true });
      console.log(`Deleted product images directory: ${productId}`);
    }
  } catch (error) {
    console.error(`Error deleting product images for ${productId}:`, error);
    throw error;
  }
}

/**
 * Delete a specific image file
 */
export function deleteImageFile(imagePath: string): void {
  try {
    // imagePath is expected to be relative to UPLOAD_BASE_DIR, e.g., /products/productId/fileName.jpg
    const fullPath = path.join(UPLOAD_BASE_DIR, imagePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`Deleted image: ${imagePath}`);
    }
  } catch (error) {
    console.error(`Error deleting image ${imagePath}:`, error);
    throw error;
  }
}

/**
 * Get product images directory path
 */
export function getProductImagesDir(productId: string): string {
  return path.join(UPLOAD_BASE_DIR, 'products', productId);
}

/**
 * Get relative image path for storage in database and serving via API
 */
export function getRelativeImagePath(productId: string, fileName: string): string {
  // This path will be used to construct the URL for the new image serving API route
  return `/products/${productId}/${fileName}`;
}

/**
 * Save uploaded file to disk
 */
export async function saveUploadedFile(
  file: File,
  productId: string
): Promise<string> {
  try {
    // Validate file
    if (!isValidImageType(file)) {
      throw new Error('Invalid file type. Only images are allowed.');
    }
    
    if (!isValidImageSize(file)) {
      throw new Error('File size exceeds 5MB limit.');
    }
    
    // Generate unique file name
    const fileName = generateUniqueFileName(file.name);
    
    // Ensure product directory exists
    const productDir = getProductImagesDir(productId);
    ensureDirectoryExists(productDir);
    
    // Save file
    const filePath = path.join(productDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);
    
    // Return relative path for database storage and API serving
    return getRelativeImagePath(productId, fileName);
  } catch (error) {
    console.error('Error saving file:', error);
    throw error;
  }
}

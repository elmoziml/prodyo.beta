import axios from 'axios';

export interface UploadImageResponse {
  success: boolean;
  imagePath: string;
  imageUrl: string;
  fileName: string;
}

export interface DeleteImageResponse {
  success: boolean;
  message: string;
  deletedPath: string;
}

/**
 * Upload an image for a product
 * @param productId - The product ID
 * @param file - The image file to upload
 */
export const uploadProductImage = async (
  productId: string,
  file: File
): Promise<UploadImageResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('productId', productId);

  const response = await axios.post<UploadImageResponse>(
    '/api/products/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};

/**
 * Upload multiple images for a product
 * @param productId - The product ID
 * @param files - Array of image files to upload
 */
export const uploadProductImages = async (
  productId: string,
  files: File[]
): Promise<UploadImageResponse[]> => {
  const uploadPromises = files.map(file => uploadProductImage(productId, file));
  return Promise.all(uploadPromises);
};

/**
 * Delete a specific product image
 * @param productId - The product ID
 * @param imageId - The image file name (e.g., "image-123.jpg")
 */
export const deleteProductImage = async (
  productId: string,
  imageId: string
): Promise<DeleteImageResponse> => {
  const response = await axios.delete<DeleteImageResponse>(
    `/api/images/${productId}/${imageId}`
  );

  return response.data;
};

/**
 * Extract image ID from image path
 * @param imagePath - Full image path (e.g., "/uploads/products/prod-123/image-456.jpg")
 * @returns Image file name (e.g., "image-456.jpg")
 */
export const extractImageId = (imagePath: string): string => {
  return imagePath.split('/').pop() || '';
};

/**
 * Delete multiple product images
 * @param productId - The product ID
 * @param imagePaths - Array of image paths to delete
 */
export const deleteProductImages = async (
  productId: string,
  imagePaths: string[]
): Promise<DeleteImageResponse[]> => {
  const deletePromises = imagePaths.map(imagePath => {
    const imageId = extractImageId(imagePath);
    return deleteProductImage(productId, imageId);
  });

  return Promise.all(deletePromises);
};

'use client';

import { useState, useRef, useCallback } from 'react';
import { uploadProductImage, deleteProductImage, extractImageId } from '@/services/imageService';
import Image from 'next/image';

interface ImageUploaderProps {
  productId: string;
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  maxSizeInMB?: number;
}

export default function ImageUploader({
  productId,
  images,
  onImagesChange,
  maxImages = 10,
  maxSizeInMB = 5,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file: File): string | null => {
    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      return 'نوع الملف غير مدعوم. الرجاء رفع صور فقط (JPG, PNG, WEBP, GIF)';
    }

    // Check file size
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      return `حجم الملف يتجاوز ${maxSizeInMB}MB`;
    }

    return null;
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setError(null);

    // Check max images limit
    if (images.length + files.length > maxImages) {
      setError(`لا يمكن رفع أكثر من ${maxImages} صور`);
      return;
    }

    setUploading(true);
    const newImages: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          continue;
        }

        // Upload file
        setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
        
        const result = await uploadProductImage(productId, file);
        
        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
        newImages.push(result.imagePath);
      }

      // Update images list
      onImagesChange([...images, ...newImages]);
      
      // Clear progress after a delay
      setTimeout(() => setUploadProgress({}), 1000);
      
    } catch (err: any) {
      setError(err.message || 'فشل رفع الصورة');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imagePath: string) => {
    try {
      const imageId = extractImageId(imagePath);
      await deleteProductImage(productId, imageId);
      
      // Update images list
      const updatedImages = images.filter(img => img !== imagePath);
      onImagesChange(updatedImages);
    } catch (err: any) {
      setError(err.message || 'فشل حذف الصورة');
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
    }
  }, [images, productId]);

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
        />
        
        <div className="space-y-2">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
              اضغط لاختيار الصور
            </button>
            {' '}أو اسحب الصور هنا
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            (حد أقصى {maxImages} صور، {maxSizeInMB}MB لكل صورة)
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-3">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && Object.keys(uploadProgress).length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
          <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">جاري رفع الصور...</p>
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="mb-2">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>{fileName}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Uploaded Images */}
      {images.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            الصور المرفوعة ({images.length}/{maxImages})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((imagePath, index) => (
              <div key={imagePath} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                  <Image
                    src={imagePath}
                    alt={`Product image ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(imagePath)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  title="حذف الصورة"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

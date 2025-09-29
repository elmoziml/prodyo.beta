
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/services/productService';

export function useProductDetail(productId: string | null) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId!),
    enabled: !!productId, // Only run the query if productId is not null
  });
}


import { Product } from '@/types';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative">
      <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        <Image
          src={product.images?.[0] || '/g19-5.png'} // Placeholder image
          alt={product.name}
          width={400}
          height={400}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700 dark:text-gray-200">
            <Link href={`/products/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
        </div>
        <p className="text-sm font-medium text-gray-900 dark:text-white">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

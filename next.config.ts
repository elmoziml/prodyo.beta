import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // إعدادات الصور
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
    // تحسين أداء الصور
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // زيادة حجم الـ body للسماح برفع الملفات الكبيرة
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
    responseLimit: '10mb',
  },
  
  // تحسينات الأداء
  experimental: {
    optimizePackageImports: [
      'react-icons',
      'lodash',
      'date-fns',
    ],
  },
  
  // إعدادات Webpack
  webpack: (config, { isServer }) => {
    // إضافة loaders للتعامل مع الملفات
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });

    return config;
  },
};

export default withNextIntl(nextConfig);

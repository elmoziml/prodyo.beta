import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ['scontent.faae2-1.fna.fbcdn.net', 'via.placeholder.com'],
  },
  // output: 'export',
  /* config options here */
};

export default withNextIntl(nextConfig);

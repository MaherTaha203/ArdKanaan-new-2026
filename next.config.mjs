/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // الواجهة عربية RTL؛ اتجاه المستند يُضبط في app/layout.tsx عبر <html dir="rtl">.
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;

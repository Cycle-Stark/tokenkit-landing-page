import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: process.env.NODE_ENV === "production" ? true : false,
  eslint: {
    ignoreDuringBuilds: true,
  },
});

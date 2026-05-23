import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  reactStrictMode: process.env.NODE_ENV === "production" ? true : false,
  // Next.js 16 dropped the `eslint` config key — lint behaviour is now
  // controlled via the standalone `next lint` command, not next.config.
});

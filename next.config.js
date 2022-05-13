const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'style')],
    prependData: `@import "Style/theme/scss/_colors.module.scss";`,
  },
};

module.exports = nextConfig;

// const withBundleAnalyzer = require('@next/bundle-analyzer')(nextConfig);

// module.exports = withBundleAnalyzer({});

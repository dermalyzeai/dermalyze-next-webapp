const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.node$/, use: 'node-loader' }],
  },
  node: {
    fs: "empty"
},
};
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    if (options.isServer) {
      return config
    }
    else {
      config.resolve.fallback.fs = false
      return config
    }
  }
};
const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    configure: (webpackConfig, { env, paths }) => {
      if (webpackConfig.mode === 'production') {
        if (webpackConfig.optimization == null) webpackConfig.optimization = {};
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/,
              priority: 10
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 9
            },
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 8
            }
          }
        };
      }
      return webpackConfig;
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
};

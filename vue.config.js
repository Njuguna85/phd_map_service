module.exports = {
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:3080",
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(
                /[\\/]node_modules[\\/](.*?)([\\/]|$)/
              )[1];
              return `npm.${packageName.replace("@", "")}`;
            },
          },
        },
      },
    },
  },
};

// All calls that start with /api will be redirected to
// http://localhost:3080 where the node js api is running

module.exports = (config) => {
  config.devServer = {
    proxy: {
      "/Module": {
        target: "http://server.1card1.cn",
        // target: "http://wjj.1card1.cn",
        changeOrigin: true,
      },
    },
  };
};

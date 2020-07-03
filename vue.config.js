const useResourcesLoader = require("./plugins/use-resources-loader");
const useSvgSpriteLoader = require("./plugins/use-svg-sprite-loader");
const useAlias = require("./plugins/use-alias");
const useProxy = require("./plugins/use-proxy");
module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/assets/gas_station/" : "/",
  outputDir: "../../assets/gas_station/",
  indexPath: "../../Module/GasStation/GasStation.html",
  configureWebpack: config => {
    useProxy(config);
    useResourcesLoader(config);
  },
  chainWebpack: config => {
    useSvgSpriteLoader(config);
    useAlias(config);
  }
};

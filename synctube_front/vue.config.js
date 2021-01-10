const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  outputDir: path.resolve(__dirname, "../server/public"),
  publicPath: "",
  devServer: {
    proxy: {
      "/info": {
        target: "http://localhost:3000",
      },
      "/": {
        target: "http://localhost:3000",
      },
    },
  },
};

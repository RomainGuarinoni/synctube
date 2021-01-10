const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  outputDir: path.resolve(__dirname, "../server/public"),
  publicPath: "",
  devServer: {
    proxy: {
      "/": {
        target: "http://localhost:3000",
      },
    },
  },
};

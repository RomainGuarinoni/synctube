const path = require("path");

module.exports = {
  transpileDependencies: ["vuetify"],
  outputDir: path.resolve(__dirname, "../server/public"),
  devServer: {
    "/": {
      target: "http://localhost:3000",
    },
  },
};

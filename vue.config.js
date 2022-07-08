const { defineConfig } = require("@vue/cli-service");
const queryEverything = require("./src/services/mock/queryEverything.json");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/base.scss";`, //引入全局变量
      },
    },
  },
  devServer: {
    host: "0.0.0.0",
    port: 8081, // 前端项目编译后使用的端口号，跟webpack配置的port同理
    onBeforeSetupMiddleware(devServer) {
      devServer.app.get("/api/v2/everything", (req, res) => {
        res.json(queryEverything);
      });
    },
    // proxy: {
    //   "/api/v2/everything": {
    //     target: "http://newsapi.org/",
    //     secure: false,
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/api": "",
    //     },
    //   },
    // },
  },
});

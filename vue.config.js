// vue.config.js
module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   */
  // 部署应用包时的基本 URL
  publicPath: '/',
  // webpack配置，会被合并入最终的webpack配置。
  configureWebpack: {
    devtool: 'source-map'
  },
  lintOnSave: false,
  // 为该依赖同时开启语法转换和根据使用情况检测 polyfill
  transpileDependencies: ['element-ui'],
  // webpack-dev-server配置
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    // host: 'oatest.iot.ctc.com',
    port: 6262,
    proxy: {
      '/api': {
        // target: 'http://192.168.109.133:8082/wlw-portal-service/',
        // target: ' http://192.168.109.133:7808/',
        // target: 'http://192.168.200.67:8260/',
        // target: 'http://zjpt.chinaccs.cn/',
        // target: 'http://localhost:8081/wlw_portal/',
        // target: 'http://oa.iot.ctc.com:7796/ydcms_web/',
        target: 'http://oatest.iot.ctc.com:7796/wlw-portal-service/',
        ws: true,
        changeOrigin: true,
        proxyTimeout: 3600000,
        timeout: 3600000
      }
    }
  }
  /* // 输出文件目录
   outputDir: 'dist',
   // eslint-loader 是否在保存的时候检查
   lintOnSave: true,
   // use the full build with in-browser compiler?
   // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
   compiler: false,
   // webpack配置
   // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
   chainWebpack: () => {},
   configureWebpack: () => {},
   //如果想要引入babel-polyfill可以这样写
   // configureWebpack: (config) => {
   //   config.entry = ["babel-polyfill", "./src/main.js"]
   // },
   // vue-loader 配置项
   // https://vue-loader.vuejs.org/en/options.html
   vueLoader: {},
   // 生产环境是否生成 sourceMap 文件
   productionSourceMap: true,
   // css相关配置
   css: {
     // 是否使用css分离插件 ExtractTextPlugin
     extract: true,
     // 开启 CSS source maps?
     sourceMap: false,
     // css预设器配置项
     loaderOptions: {},
     // 启用 CSS modules for all css / pre-processor files.
     modules: false
   },
   // use thread-loader for babel & TS in production build
   // enabled by default if the machine has more than 1 cores
   parallel: require('os').cpus().length > 1,
   // 是否启用dll
   // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
   dll: false,
   // PWA 插件相关配置
   // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
   pwa: {},
   // webpack-dev-server 相关配置
   devServer: {
     open: process.platform === 'darwin',
     host: '0.0.0.0',
     port: 8080,
     https: false,
     hotOnly: false,
     proxy: null, // 设置代理
     before: app => {}
   },
   // 第三方插件配置
   pluginOptions: {
     // ...
   } */
}

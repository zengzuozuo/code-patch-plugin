const { defineConfig } = require('@vue/cli-service')
const CodePatchPlugin = require('./codePatchPlugin')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new CodePatchPlugin({noEs6: true})
    ] //插件
  }
})

const { defineConfig } = require('@vue/cli-service')
const CodePatchPlugin = require('./codePatchPlugin')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new CodePatchPlugin({url: 'test.com'})
    ] //插件
  }
})

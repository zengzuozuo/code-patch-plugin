const cheerio = require('cheerio')
const fs = require('fs')
const uglifyjs = require('uglify-js')
var babel = require("babel-core")
class CodePatchPlugin {
    constructor(options) {
        this.options = options
        this.reg = {
            isJS: /^[^\s\>\<\(\)]+(?:\.js)$/
        }
    }

    apply(compiler) {
        const that = this
        console.log("***CodePatchPlugin Runing***")
        compiler.hooks.emit.tapAsync('CodePatchPlugin', (compilation, callback) => {
            if(this.options.noEs6) {
                const jsFiles = Object.keys(compilation.assets).filter(item => {
                    return this.reg.isJS.test(item)
                })
                jsFiles.forEach(item => {
                    const targetData = that.jsToEs5(compilation.assets[item].source())
                    compilation.assets[item] = {
                        source() {
                            return targetData
                        },
                        size() {
                            return targetData.length;
                        }
                    }
                })
            }
            const indexHtmlText = compilation.assets['index.html'].source()
            const $ = cheerio.load(indexHtmlText)
            const codePatchJS = fs.readFileSync(__dirname + '/src/codePatch.js', 'utf-8')
            const mini_codePatchJS = uglifyjs.minify(codePatchJS, {
                mangle: false
            })
            $('head').prepend(`<script type="text/javascript">${mini_codePatchJS.code}</script>`)
            const htmlStr = $.html()
            // 输出修改
            compilation.assets['index.html'] = {
                source() {
                    return htmlStr
                },
                size() {
                    return htmlStr.length;
                }
            }
            callback();
        })
    }

    jsToEs5(code) {
        const result = babel.transform(code)
        return result.code
    }
}

module.exports = CodePatchPlugin
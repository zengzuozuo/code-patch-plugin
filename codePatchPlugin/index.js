const cheerio = require('cheerio')
const fs = require('fs')
const uglifyjs = require('uglify-js')
class CodePatchPlugin {
    constructor(options) {
        this.options = options
    }

    apply(compiler) {
        console.log("***CodePatchPlugin Runing***")
        compiler.hooks.emit.tapAsync('CodePatchPlugin', (compilation, callback) => {
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
}

module.exports = CodePatchPlugin
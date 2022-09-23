const execSync = require('child_process').execSync
const path = require('path')
const dingtalkKey = 'commit'
module.exports = async function(accessToken) {
    const packageJAONdiffMessage = execSync(`git diff HEAD ${path.resolve('package.json')}`).toString().trim()
    if(packageJAONdiffMessage) {
        const name = execSync('git show -s --format=%cn').toString().trim()
        const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
        console.error("package.json有修改,请确认是否有新的依赖引入，注意考察其兼容性")
        postMessage(name, branch, packageJAONdiffMessage, accessToken)
    }else {
        process.exit(0)
    }
}
async function postMessage(name, branch, text, accessToken) {
    const processRootDir = path.resolve()
    const content = `【${dingtalkKey}】\n****用户（${name}）****\n****项目（${processRootDir.split('\\')[processRootDir.split('\\').length - 1]}）****\n****分支（${branch}）****\n****修改了package.json文件 *****\n${text}`
    require('./src/warning')(content, accessToken)
}


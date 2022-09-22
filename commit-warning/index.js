const execSync = require('child_process').execSync
const axios = require('axios')
const path = require('path')
const dingtalkKey = 'commit'
const accessToken = '9e9d98d6e2d3b6ed5191d8749b72bef43b59dd459b01b02fb42a5a9b01056bcc'
const packageJAONdiffMessage = execSync(`git diff HEAD ${path.resolve('package.json')}`).toString().trim()
const processRootDir = path.resolve()
if(packageJAONdiffMessage) {
    const name = execSync('git show -s --format=%cn').toString().trim()
    const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim()
    console.error("package.json有修改,请确认是否有新的依赖引入，注意考察其兼容性")
    postMessage(name, branch, packageJAONdiffMessage)
}else {
    process.exit(0)
}
async function postMessage(name, branch, text) {
    const content = `
        【${dingtalkKey}】
        ****用户（${name}）****
        ****项目（${processRootDir.split('\\')[processRootDir.split('\\').length - 1]}）****
        ****分支（${branch}）****
        ****修改了package.json文件 *****
        ${text}`
    axios.post(`https://oapi.dingtalk.com/robot/send?access_token=${accessToken}`, {
        "msgtype": "text",
        "text": {
            "content": content
        }
    }).then(res => {
        process.exit(0)
    }).catch(err => {
        process.exit(0)
    })
}


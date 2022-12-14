
const execSync = require('child_process').execSync
const axios = require('axios')
const dingtalkKey = 'commit'
const accessToken = '9e9d98d6e2d3b6ed5191d8749b72bef43b59dd459b01b02fb42a5a9b01056bcc'
const packageJAONdiffMessage = execSync(`git diff HEAD ${__dirname + '/package.json'}`).toString().trim()
if(packageJAONdiffMessage) {
    let name = execSync('git show -s --format=%cn').toString().trim()
    console.error("package.json有修改,请确认是否有新的依赖引入，注意考察其兼容性")
    postMessage(name, packageJAONdiffMessage)
}
async function postMessage(name, text) {
    const content = `【${dingtalkKey}】\n ****用户（${name}）**** \n ****项目（${__dirname.split('\\')[__dirname.split('\\').length - 1]}）**** \n ****修改了package.json文件 ***** \n ${text}`
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


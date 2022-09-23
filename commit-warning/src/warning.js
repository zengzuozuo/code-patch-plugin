const https = require('https')

module.exports = function (content, token) {
  const postData = {
    msgtype: 'text',
    at: {
      isAtAll: false,
    },
    text: {
      content
    },
  }
  const req = https.request({
    hostname: 'oapi.dingtalk.com',
    port: 443,
    path: `/robot/send?access_token=${token}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  }, function (data) {
    let str = ''
    data.on('data', function (chunk) {
      str += chunk
      process.exit(0)
    })
    data.on('end', function () {
      console.info(str.toString())
      process.exit(0)
    })
    data.on('err', function (err) {
      console.info(err)
      process.exit(0)
    })
  })

  req.write(JSON.stringify(postData))
  req.end()
}

# code-patch-plugin

## use
```
npm install code-patch-plugin -D
```

Modify vue.config.js
```
const CodePatchPlugin = require('codePatchPlugin')

configureWebpack: {
    plugins: [
      new CodePatchPlugin()
    ]
}
```

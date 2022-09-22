# commit-warning

## use
```
npm install commit-warning -D
```

Modify package.json
```
"gitHooks": {
    "pre-commit": "node ./node_modules/commit-warning/index.js"
}
```
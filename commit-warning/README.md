# commit-warning

## use
```
npm install commit-warning -D
```

Modify package.json
```
"gitHooks": {
    "pre-commit": "node ./node_modules/commit-warning/bin YoursDingDingToken"
}
```
or

```
"scripts": {
    "cw": "commit-warning YoursDingDingToken"
},
"gitHooks": {
    "pre-commit": "npm run cw"
}
```
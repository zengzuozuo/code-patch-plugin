const changInfo = []

function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

function diff(oldly, newly, target = null) {
  if (!oldly || !newly) return false

  /** 新增或修改 */
  Object.keys(newly).map((key) => {
    if (!oldly[key]) {
      changInfo.push({
        attrName: target ? `${target}.${key}` : key,
        type: 'INCREASE',
        content: newly[key],
        oldContent: '',
      })
    }

    if (oldly[key]) {
      if (isObject(newly[key]) && isObject(oldly[key])) {
        diff(oldly[key], newly[key], target ? `${target}.${key}` : key)
      } else if (
        (!isObject(newly[key]) && isObject(oldly[key])) ||
        (isObject(newly[key]) && !isObject(oldly[key])) ||
        (!isObject(newly[key]) && !isObject(oldly[key]) && newly[key] !== oldly[key])
      ) {
        changInfo.push({
          attrName: target ? `${target}.${key}` : key,
          type: 'UPDATE',
          content: newly[key],
          oldContent: oldly[key],
        })
      }
    }
  })

  /** 移除的 */
  Object.keys(oldly).map((key) => {
    if (!newly[key]) {
      changInfo.push({
        attrName: target ? `${target}.${key}` : key,
        type: 'DELETE',
        content: '',
        oldContent: oldly[key],
      })
    }
  })
}

module.exports = function run(oldly, newly) {
  diff(oldly, newly)

  return changInfo
}

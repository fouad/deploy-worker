const compileJS = require('@zeit/ncc')

module.exports = function build(input) {
  let { filePath, minify = false } = input

  return compileJS(filePath, {
    minify,
    cache: false
  }).then(result => {
    let { code } = result

    return { code: code.replace('module.exports =\n', '') }
  })
}

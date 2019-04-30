const compileJS = require('@zeit/ncc')
const { wait, success, error } = require('./stdout')

module.exports = function build(input) {
  let { filePath, minify = false } = input
  let stop = wait(`Building Cloudflare worker...`)

  return compileJS(filePath, {
    minify,
    quiet: true,
    cache: false
  })
    .then(result => {
      let { code } = result

      stop()
      success('Cloudflare Worker compiled')

      return { code: code.replace('module.exports =\n', '') }
    })
    .catch(err => {
      stop()
      return err
    })
}

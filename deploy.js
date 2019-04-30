const fetch = require('node-fetch')
const { wait, success, error } = require('./stdout')
const cfHost = 'https://api.cloudflare.com/client/v4'

module.exports = function deploy(input) {
  let { code, zoneId, accountId, email, authKey } = input
  let stop = wait(`Deploying to Cloudflare zone (${zoneId})`)

  return fetch(`${cfHost}/zones/${zoneId}/workers/script`, {
    method: 'PUT',
    body: code,
    headers: {
      'Content-Type': 'application/javascript',
      'X-Auth-Email': email,
      'X-Auth-Key': authKey
    }
  })
    .then(async res => {
      let { status } = res

      stop()

      if (status >= 400) {
        error(`Cloudflare zone (${zoneId}) update failed`)
        console.log(await res.text())
      } else if (status === 200) {
        success(`Cloudflare zone (${zoneId}) updated`)
      }

      return { status }
    })
    .catch(err => {
      console.error(err)
      return err
    })
}

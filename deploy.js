const fetch = require('node-fetch')

const cfHost = 'https://api.cloudflare.com/client/v4'

module.exports = function deploy(input) {
  let { code, zoneId, accountId, email, authKey } = input

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

      if (status >= 400) {
        console.log('\n cloudflare api error:')
        console.log(await res.text())
      }

      return { status }
    })
    .catch(err => {
      console.error(err)
      return err
    })
}

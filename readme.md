<br/>
<p align="center">
  <strong><code>🌤 deploy-worker</code></strong>
</p>

<p align="center">
  Easiest way to compile <br/>
  and deploy Cloudflare Workers.
</p>
<br/>

<p align="center">
  <a href="https://www.npmjs.com/package/deploy-worker"><img src="https://img.shields.io/npm/v/deploy-worker.svg?maxAge=3600&label=deploy-worker&colorB=007ec6"></a>
</p>
<br/>

```console
deploy-worker --zone-id {zone-id} worker.js
```

#### Installation

Install with npm:

```console
npm install --global deploy-worker
```

Or yarn:

```console
yarn global add deploy-worker
```

#### Authentication

You need to pass in `CF_EMAIL` and `CF_AUTH_Key` as environment variables and then you can set `CF_ZONE_ID`/`--zone-id` and optionally `CF_ACCOUNT_ID`/`--acount-id` if you're an Enterprise customer.

#### Usage

**Requirements**

- Cloudflare Account
- [Cloudflare Auth Key](https://support.cloudflare.com/hc/en-us/articles/200167836-Where-do-I-find-my-Cloudflare-API-key-) and [Zone ID](https://developers.cloudflare.com/workers/api/#zone-id)

Create a `package.json` to install modules you're using:

```js
{
  "dependencies": {
    "node-emoji": "^1.1.0",
    "qs": "^6.7.0"
  }
}
```

Then create your `.js` or `.ts` file, like `worker.js`:

```js
import { parse } from 'qs'
import { get as getEmoji } from 'node-emoji'

addEventListener('fetch', event => {
  let { request } = event
  let query = parse(request.url.split('?')[1] || '')
  let qsEmoji = query.emoji || 'star'
  let emoji = getEmoji(qsEmoji)

  event.respondWith(new Response(emoji))
})
```

Make sure your dependencies are installed, then run `deploy-worker` like this:

```console
deploy-worker --zone-id {zone-id} worker.js
```

Congrats! You've deployed a Cloudflare Worker 🎉

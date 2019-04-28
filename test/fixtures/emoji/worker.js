import { parse } from 'qs'
import { get as getEmoji } from 'node-emoji'

addEventListener('fetch', event => {
  let { request } = event
  let query = parse(request.url.split('?')[1] || '')
  let qsEmoji = query.emoji || 'star'
  let emoji = getEmoji(qsEmoji)

  event.respondWith(new Response(emoji))
})

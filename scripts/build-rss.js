import fs from 'fs'
import RSS from 'rss'
import getAllPostPreviews from '../src/lib/getAllPostPreviews'

function generate() {
  const feed = new RSS({
    title: 'Blog – kimizuy',
    site_url: 'https://blog.kimizuy.dev',
    feed_url: 'https://blog.kimizuy.dev/feed.xml',
  })

  getAllPostPreviews().map(({ link, meta }) => {
    feed.item({
      title: meta.title,
      guid: link,
      url: `https://blog.kimizuy.dev${link}`,
      date: meta.date.published,
      description: meta.description,
    })
  })

  const rss = feed.xml({ indent: true })

  fs.writeFileSync('./.next/static/feed.xml', rss)
}

generate()

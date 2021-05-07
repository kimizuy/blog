import { MDXComponents } from 'components/post/mdxComponents'
import { NAME, SITE_TITLE, SITE_URL } from 'lib/constants'
import { getAllPostsForRSS } from 'lib/getAllPostPreviews'
import { MDXProvider } from '@mdx-js/react'
import { Feed } from 'feed'
import fs from 'fs'
import ReactDOMServer from 'react-dom/server'

const feed = new Feed({
  title: SITE_TITLE,
  description: 'Latest posts on kimizuy blog.',
  id: SITE_URL,
  link: SITE_URL,
  language: 'ja',
  image: `${SITE_URL}/favicon-32x32.png`,
  favicon: `${SITE_URL}/favicon.ico`,
  copyright: `All rights reserved ${new Date().getFullYear()}, kimizuy`,
  feedLinks: {
    rss: `${SITE_URL}/feed.xml`,
    json: `${SITE_URL}/feed.json`,
    atom: `${SITE_URL}/atom.xml`,
  },
  author: {
    name: NAME,
    link: 'https://twitter.com/kimizuy',
  },
})

getAllPostsForRSS().forEach(({ slug, module: { meta, default: Content } }) => {
  const postPath = `/posts/${slug}`
  const mdx = (
    <MDXProvider components={MDXComponents}>
      <Content />
    </MDXProvider>
  )
  const html = ReactDOMServer.renderToStaticMarkup(mdx)
  const postText = `<p><em>(The post <a href="${SITE_URL + postPath}">${
    meta.title
  }</a> appeared first on <a href="${SITE_URL}">kimizuy blog</a>.)</em></p>`

  feed.addItem({
    title: meta.title,
    id: SITE_URL + postPath,
    link: SITE_URL + postPath,
    description: meta.description,
    content: html + postText,
    date: new Date(meta.date.published),
    image: SITE_URL + meta.image,
  })
})

fs.writeFileSync('./.next/static/feed.xml', feed.rss2())
fs.writeFileSync('./.next/static/atom.xml', feed.atom1())
fs.writeFileSync('./.next/static/feed.json', feed.json1())

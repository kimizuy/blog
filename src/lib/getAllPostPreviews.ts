import { dateSortDesc } from './utils'
import { Preview } from 'types/post'

const importAll = (r): Preview[] => {
  return r.keys().map(
    (fileName): Preview => {
      return {
        slug: fileName.substr(2).replace(/\/index\.mdx$/, ''),
        module: r(fileName),
      }
    }
  )
}

export const getAllPostPreviews = (): Preview[] => {
  return importAll(
    require.context('../pages/posts/', true, /\.mdx$/)
  ).sort((a, b) =>
    dateSortDesc(a.module.meta.date.published, b.module.meta.date.published)
  )
}

export const getAllPostsForRSS = (): Preview[] => {
  return importAll(
    require.context('../pages/posts/?rss', true, /\.mdx$/)
  ).sort((a, b) =>
    dateSortDesc(a.module.meta.date.published, b.module.meta.date.published)
  )
}

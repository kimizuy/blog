import { Date } from 'components/date'
import { Layout } from 'components/layout'
import { SITE_URL } from 'lib/constants'
import { Meta } from 'types/post'
import { MDXProvider } from '@mdx-js/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { ArticleEnd } from './articleEnd'
import styles from './index.module.css'
import { MDXComponents } from './mdxComponents'
import { Toc } from './toc'

export const Post: React.VFC<{
  meta: Meta
  children: React.ReactNode
}> = ({ meta, children }) => {
  const router = useRouter()

  return (
    <Layout sideBarItem={<Toc />}>
      <Head>
        <title>{meta.title} – kimizuy blog</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kimizuy" />
        <meta name="twitter:creator" content="@kimizuy" />
        <meta name="twitter:title" content={`${meta.title} – kimizuy blog`} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={`${SITE_URL}${meta.image}`} />
        <meta property="og:url" content={`${SITE_URL}${router.pathname}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${meta.title} – kimizuy blog`} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={`${SITE_URL}${meta.image}`} />
        <meta name="description" content={meta.description}></meta>
      </Head>
      <article>
        <header>
          <h1 className={styles.title}>{meta.title}</h1>
          <small className={styles.meta}>
            {meta.tags.map((tag) => (
              <Fragment key={tag}>
                <Link href="/tags/[tag]" as={`/tags/${tag}`}>
                  <a>#{tag}</a>
                </Link>{' '}
              </Fragment>
            ))}
            <br />
            <Date date={meta.date} />
          </small>
        </header>
        <main className="post">
          <MDXProvider components={MDXComponents}>{children}</MDXProvider>
        </main>
        <footer>
          <ArticleEnd />
        </footer>
      </article>
    </Layout>
  )
}

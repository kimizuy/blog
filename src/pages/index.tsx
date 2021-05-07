import { CardList } from 'components/cardList'
import { Layout } from 'components/layout'
import { TagButtonList } from 'components/tagButtonList'
import { useGetTweetData } from 'hooks/useGetTweetData'
import { SITE_URL } from 'lib/constants'
import { fetchTweet } from 'lib/fetchTweet'
import { getAllPostPreviews } from 'lib/getAllPostPreviews'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Tweet } from 'react-static-tweets'
import profile from '../../public/profile.jpg'

const Home: React.VFC<{ tweetId: string; tweetAst: string }> = (props) => {
  const previews = getAllPostPreviews()
  const { data } = useGetTweetData(props)

  return (
    <Layout
      home
      sideBarItem={
        <>
          <TagButtonList />
          <Tweet id={data.tweetId} ast={data.tweetAst} />
        </>
      }
    >
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@kimizuy" />
        <meta name="twitter:creator" content="@kimizuy" />
        <meta name="twitter:title" content="kimizuy blog" />
        <meta name="twitter:description" content="kimizuy のブログです" />
        <meta name="twitter:image" content={`${SITE_URL}${profile}`} />
        <meta property="og:url" content="${SITE_URL}" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="kimizuy blog" />
        <meta property="og:description" content="kimizuy のブログです" />
        <meta property="og:image" content={`${SITE_URL}${profile}`} />
        <title>kimizuy blog</title>
        <meta name="description" content="kimizuy のブログです" />
      </Head>
      <CardList previews={previews} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const tweet = await fetchTweet()

    return {
      props: tweet,
      revalidate: 10,
    }
  } catch (err) {
    console.error(err)
  }
}

// eslint-disable-next-line import/no-default-export
export default Home

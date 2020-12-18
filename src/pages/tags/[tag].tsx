import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '@/components/layout'
import { Preview } from '@/types/post'
import getAllTags from '@/lib/getAllTags'
import getSelectedTagPreviews from '@/lib/getSelectedTagPreviews'
import CardList from '@/components/cardList'

type Props = {
  selectedTag: string
  selectedTagPreviews: Preview[]
}

const Tag: React.VFC<Props> = ({ selectedTag, selectedTagPreviews }) => {
  return (
    <Layout home>
      <Head>
        <title>{selectedTag}</title>
      </Head>
      <h1 style={{ padding: '0 1rem' }}>#{selectedTag}</h1>
      <section>
        <CardList previews={selectedTagPreviews} />
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllTags().map((tag) => {
    return {
      params: {
        tag,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const selectedTag = params.tag as string
  const selectedTagPreviews = getSelectedTagPreviews(selectedTag)
  return {
    props: {
      selectedTag,
      selectedTagPreviews,
    },
  }
}

export default Tag

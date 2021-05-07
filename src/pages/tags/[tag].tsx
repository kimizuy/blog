import { CardList } from 'components/cardList'
import { Layout } from 'components/layout'
import { TagButtonList } from 'components/tagButtonList'
import { getAllTags } from 'lib/getAllTags'
import { getSelectedTagPreviews } from 'lib/getSelectedTagPreviews'
import { Preview } from 'types/post'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import styles from './tag.module.css'

type Props = {
  selectedTag: string
  selectedTagPreviews: Preview[]
}

const Tag: React.VFC<Props> = ({ selectedTag, selectedTagPreviews }) => {
  return (
    <Layout sideBarItem={<TagButtonList />}>
      <Head>
        <title>{selectedTag}</title>
      </Head>
      <h1 className={styles.tagTitle}>#{selectedTag}</h1>
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
  const selectedTag = params.tag
  const selectedTagPreviews = getSelectedTagPreviews(selectedTag)
  return {
    props: {
      selectedTag,
      selectedTagPreviews,
    },
  }
}

// eslint-disable-next-line import/no-default-export
export default Tag

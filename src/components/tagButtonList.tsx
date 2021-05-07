import styles from './tagButtonList.module.css'
import Link from 'next/link'
import { getAllTags } from 'lib/getAllTags'

const tags = getAllTags()

export const TagButtonList: React.VFC = () => {
  return (
    <div className={styles.tagButtonList}>
      {tags.map((tag) => (
        <TagButton key={tag} tag={tag} />
      ))}
    </div>
  )
}

const TagButton: React.VFC<{ tag: string }> = ({ tag }) => {
  return (
    <Link href="/tags/[tag]" as={`/tags/${tag}`}>
      <button className={styles.tagButton}>#{tag}</button>
    </Link>
  )
}

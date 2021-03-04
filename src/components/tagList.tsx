import styles from './tagList.module.css'
import Link from 'next/link'
import { getAllTags } from '@/lib/getAllTags'

const tags = getAllTags()

export const TagList: React.VFC = () => {
  return (
    <div className={styles.tagList}>
      {tags.map((tag) => (
        <TagButton key={tag} tag={tag} />
      ))}
    </div>
  )
}

const TagButton: React.VFC<{ tag: string }> = ({ tag }) => {
  return (
    <Link href="/tags/[tag]" as={`/tags/${tag}`}>
      <button className={styles.tag}>#{tag}</button>
    </Link>
  )
}

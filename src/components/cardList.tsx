import { Date } from 'components/date'
import { Preview } from 'types/post'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import styles from './cardList.module.css'

type Props = {
  previews: Preview[]
}

export const CardList: React.VFC<Props> = (p: Props) => {
  return (
    <ul
      // Enable :active for iOS
      onTouchStart={() => {
        return ''
      }}
      className={styles.cardList}
    >
      {p.previews.map((preview) => (
        <Card preview={preview} key={preview.slug} />
      ))}
    </ul>
  )
}

const Card: React.VFC<{ preview: Preview }> = ({ preview }) => {
  const {
    slug,
    module: { meta },
  } = preview

  return (
    <li className={styles.card}>
      <div className={styles.imgWrapper}>
        <Image src={meta.image} alt={slug} layout="fill" />
      </div>
      <div className={styles.meta}>
        <div>
          <Link href={`/posts/${slug}`}>
            <a className={styles.title}>{meta.title}</a>
          </Link>
        </div>
        <div>
          <small>
            {meta.tags.map((tag) => (
              <Fragment key={tag}>
                <Link href="/tags/[tag]" as={`/tags/${tag}`}>
                  <a className={styles.tag}>#{tag}</a>
                </Link>{' '}
              </Fragment>
            ))}
            <Date date={meta.date} />
          </small>
        </div>
      </div>
    </li>
  )
}

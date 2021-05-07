import { NAME, SITE_TITLE } from 'lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import styles from './logo.module.css'

export const Logo: React.VFC = () => {
  return (
    <Link href="/">
      <a className={styles.logo}>
        <div className={styles.logoImgWrapper}>
          <Image
            src="/profile.jpg"
            alt={NAME}
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
        <h1 className={styles.logoTitle}>{SITE_TITLE}</h1>
      </a>
    </Link>
  )
}

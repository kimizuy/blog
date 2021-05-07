import { Meta } from 'types/post'
import { format, parseISO } from 'date-fns'
import styles from './date.module.css'

type Props = {
  date: Meta['date']
}

export const Date: React.VFC<Props> = (p) => {
  return (
    <div className={styles.date}>
      Published <Time value={p.date.published} />
      <br />
      {p.date.updated && (
        <>
          Last updated <Time value={p.date.updated} />
        </>
      )}
    </div>
  )
}

const Time: React.VFC<{ value: string }> = ({ value }) => {
  const date = parseISO(value)
  return <time dateTime={value}>{format(date, 'yyyy/M/d')}</time>
}

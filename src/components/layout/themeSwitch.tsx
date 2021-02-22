import { useTheme } from '@/providers/themeProvider'
import { useEffect, useState } from 'react'
import styles from './themeSwitch.module.css'

export const ThemeSwitch: React.VFC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className={styles.switchContainer}>
      <label className={styles.switch}>
        Theme Switch
        <input
          type="checkbox"
          checked={theme !== 'dark'}
          onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={styles.slider}
        />
        <span className={`${styles.slider} ${styles.round}`} />
      </label>
    </div>
  )
}
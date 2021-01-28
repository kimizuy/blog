// Based on: https://github.com/pacocoursey/next-themes
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  memo,
} from 'react'
import NextHead from 'next/head'

interface UseThemeProps {
  themes: string[]
  setTheme: (theme: string) => void
  theme?: string
  resolvedTheme?: string
  systemTheme?: 'dark' | 'light'
}

const ThemeContext = createContext<UseThemeProps>({
  setTheme: (_) => {
    return
  },
  themes: [],
})
export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.VFC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState(() => getTheme('theme'))
  const [resolvedTheme, setResolvedTheme] = useState(() => getTheme('theme'))

  const changeTheme = useCallback((theme, updateStorage = true) => {
    const name = theme

    if (updateStorage) {
      try {
        localStorage.setItem('theme', theme)
      } catch (e) {
        // Unsupported
      }
    }

    const d = document.documentElement

    d.setAttribute('data-theme', name)
    // All of these deps are stable and should never change
  }, []) // eslint-disable-line

  const handleMediaQuery = useCallback(
    (e) => {
      const isDark = e.matches
      const systemTheme = isDark ? 'dark' : 'light'
      setResolvedTheme(systemTheme)

      if (theme === 'system') changeTheme(systemTheme, false)
    },
    [theme] // eslint-disable-line
  )

  useEffect(() => {
    // Always listen to System preference
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', handleMediaQuery)
    handleMediaQuery(media)

    return () => media.removeEventListener('change', handleMediaQuery)
  }, [handleMediaQuery]) // eslint-disable-line

  const setTheme = useCallback(
    (newTheme) => {
      changeTheme(newTheme)
      setThemeState(newTheme)
    },
    // All of these deps are stable and should never change
    [] // eslint-disable-line
  )

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== 'theme') return

      const theme = e.newValue
      setTheme(theme)
    }

    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
    // All of these deps are stable and should never change
  }, []) // eslint-disable-line

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        resolvedTheme: theme === 'system' ? resolvedTheme : theme,
        themes: [...['light', 'dark'], 'system'],
        systemTheme: resolvedTheme as 'light' | 'dark' | undefined,
      }}
    >
      <ThemeScript />
      {children}
    </ThemeContext.Provider>
  )
}

const ThemeScript = memo(
  () => {
    // Code-golfing the amount of characters in the script
    const optimization = (() => {
      return `var d=document.documentElement;`
    })()

    const updateDOM = (name: string, literal?: boolean) => {
      const val = literal ? name : `'${name}'`

      return `d.setAttribute('${'data-theme'}', ${val})`
    }

    return (
      <NextHead>
        <script
          key="next-themes-script"
          dangerouslySetInnerHTML={{
            // prettier-ignore
            __html: `!function(){try {${optimization}var e=localStorage.getItem('theme');if(!e)return localStorage.setItem('theme','light'),${updateDOM('light')};if('system'===e){var t="(prefers-color-scheme: dark)",m=window.matchMedia(t);m.media!==t||m.matches?${updateDOM('dark')}:${updateDOM('light')}}else ${''}${updateDOM('e', true)}}catch(e){}}()`,
          }}
        />
      </NextHead>
    )
  },
  () => {
    // Only re-render when forcedTheme changes
    // the rest of the props should be completely stable
    return true
  }
)

// Helpers
const getTheme = (key: string) => {
  if (typeof window === 'undefined') return undefined
  let theme
  try {
    theme = localStorage.getItem(key) || undefined
  } catch (e) {
    // Unsupported
  }
  return theme
}

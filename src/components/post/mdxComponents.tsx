import { useImageOverlay } from 'providers/imageOverlayProvider'
import { Components } from '@mdx-js/react'
import Image from 'next/image'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/vsDark'
import { Fragment } from 'react'
import styles from './mdxComponents.module.css'

const CodeBlock: React.VFC<{
  children: string
  className: string
}> = ({ children, className = 'markup' }) => {
  const splited = className.replace(/language-/, '').split(':')
  const language = splited[0] as Language
  const fileName = splited[1]

  return (
    <div className={styles.codeBlock}>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} ${styles.pre} ${
              !fileName && styles.noFileName
            }`}
            style={style}
          >
            {fileName && <span className={styles.fileName}>{fileName}</span>}
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                className={styles.line}
              >
                <span className={styles.lineNo}>
                  {tokens.length > 1 ? i + 1 : ''}
                </span>
                <span className={styles.lineContent}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export const MDXComponents: Components = {
  img: (props) => {
    const { setSrc } = useImageOverlay()
    const src: string = props.src
    const srcName = src.split('/')[src.split('/').length - 1].split('.')[0]

    return (
      <div className={styles.imgWrapper}>
        <Image
          {...props}
          src={src}
          alt={srcName}
          // https://nextjs.org/docs/api-reference/next/image#layout
          layout="responsive"
          objectFit="contain"
          width={1170}
          height={658.125}
          className={styles.img}
          onClick={() => {
            setSrc(props.src)
          }}
        />
      </div>
    )
  },
  pre: (props) => <Fragment {...props} />,
  code: CodeBlock,
  p: (props) => <p {...props} className={styles.p} />,
  h1: (props) => {
    return (
      <h1
        {...props}
        id={props.children}
        className={`${styles.heading} ${styles.h1}`}
      />
    )
  },
  h2: (props) => {
    return (
      <h2
        {...props}
        id={props.children}
        className={`${styles.heading} ${styles.h2}`}
      />
    )
  },
  h3: (props) => {
    return (
      <h3
        {...props}
        id={props.children}
        className={`${styles.heading} ${styles.h3}`}
      />
    )
  },
  ul: (props) => <ul {...props} className={styles.ul} />,
  ol: (props) => <ol {...props} className={styles.ol} />,
  div: (props) => {
    if (props.className === 'footnotes') {
      return <div {...props} className={styles.footnotes} />
    }
    return <div {...props} />
  },
  blockquote: (props) => (
    <blockquote {...props} className={styles.blockquote} />
  ),
}

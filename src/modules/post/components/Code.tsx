import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import CopyToClipboard from 'react-copy-to-clipboard'
import styles from '../styles/Code.module.scss'

const Code = ({ inline, className, children, ...props }: any) => {
  const [isCopied, setIsCopied] = useState(false)
  const match = /language-(\w+)/.exec(className || '')

  const onCopyHandler = () => {
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 5000)
  }

  return !inline && match ? (
    <div className={styles.container}>
      <CopyToClipboard text={children} onCopy={onCopyHandler}>
        <button className={styles.copyBtn}>
          <Image
            src={'/assets/interactions/copy.svg'}
            alt="copy to clipboard icon"
            width={'30'}
            height={'30'}
          />
        </button>
      </CopyToClipboard>
      {isCopied && <div className={styles.copied}>Copied</div>}
      <SyntaxHighlighter
        style={okaidia}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}

export default Code

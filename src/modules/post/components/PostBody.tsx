import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from '../styles/PostBody.module.scss'
import Code from './Code'

type PostBodyProps = {
  content?: string
}

const PostBody = ({ content }: PostBodyProps) => {
  return (
    <div>
      <article className={styles.content}>
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              return (
                <Code
                  node={node}
                  inline={inline}
                  className={className}
                  {...props}
                >
                  {children}
                </Code>
              )
            },
          }}
        >
          {content ? content.replace(/"/, '').replace(/"$/, '') : ''}
        </ReactMarkdown>
      </article>
    </div>
  )
}
export default PostBody

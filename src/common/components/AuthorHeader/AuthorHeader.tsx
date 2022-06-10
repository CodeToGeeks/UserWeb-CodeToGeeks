import React from 'react'
import styles from './AuthorHeader.module.scss'
import { Author } from '@models/Author.model'

type AuthorHeaderProps = { author: Author; date: Date }

const AuthorHeader = ({ author, date }: AuthorHeaderProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })
  return (
    <div className={styles.blogHeader}>
      <img
        src={author.profile_image}
        alt={author.name}
        width="200"
        height="200"
      />
      <div className={styles.info}>
        <div>{author.name}</div>
        <div>{formattedDate}</div>
      </div>
    </div>
  )
}

export default AuthorHeader

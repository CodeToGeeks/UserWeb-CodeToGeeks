import React from 'react'
import Image from 'next/image'
import AuthorHeader from '@components/AuthorHeader/AuthorHeader'
import SocialMedia from './SocialMedia'
import { Author } from '@models/Author.model'
import styles from '../styles/PostHeader.module.scss'
import { Tag } from '@models/Tag.model'

type PostHeaderProps = {
  coverImage: string
  title: string
  author: Author
  tags: Tag[]
  date: Date
}

const PostHeader = ({ coverImage, title, author, date }: PostHeaderProps) => {
  return (
    <header className={styles.container}>
      {coverImage && (
        <Image
          className={styles.cover}
          src={coverImage}
          alt={title}
          width="800"
          height="400"
        />
      )}
      <div className={styles.headerContainer}>
        <div className={styles.socialWrapper}>
          <AuthorHeader
            name={author.name}
            date={date}
            profileImage={author.profile_image}
          />
          <SocialMedia />
        </div>
        <div>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>
    </header>
  )
}
export default PostHeader

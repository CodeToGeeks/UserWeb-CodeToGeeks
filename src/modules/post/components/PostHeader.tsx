import React from 'react'
import Image from 'next/image'
import PostHashtags from '@components/PostTags/PostTags'
import AuthorHeader from '@components/AuthorHeader/AuthorHeader'
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
      <Image
        className={styles.cover}
        src={coverImage}
        alt={title}
        width="800"
        height="400"
      />
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{title}</h1>
        <AuthorHeader
          name={author.name}
          date={date}
          profileImage={author.profile_image}
        />
        <PostHashtags
          style={styles.tags}
          tags={[
            {
              _id: '6248d0fe9195b4d1b8f88f57',
              name: 'CSS',
              color: '#3492eb',
            },
            {
              _id: '6248d1349195b4d1b8f88f5d',
              name: 'HTML',
              color: '#34ebd3',
            },
            {
              _id: '623d1621d1f0b8883acfb78d',
              name: 'javaScript',
              color: '#FFC300',
            },
          ]}
        />
      </div>
    </header>
  )
}
export default PostHeader

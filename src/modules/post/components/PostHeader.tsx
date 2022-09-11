import React from 'react'
import Image from 'next/image'
import AuthorHeader from '@components/AuthorHeader/AuthorHeader'
import SocialMedia from './SocialMedia'
import Interactions from './Interactions'
import { Author } from '@models/Author.model'
import styles from '../styles/PostHeader.module.scss'
import { Tag } from '@models/Tag.model'

type PostHeaderProps = {
  _id: string
  coverImage: string
  title: string
  slug: string
  author: Author
  tags: Tag[]
  date: Date
}

const PostHeader = ({
  _id,
  coverImage,
  title,
  slug,
  author,
  date,
}: PostHeaderProps) => {
  return (
    <header className={styles.container}>
      {coverImage && (
        <Image
          className={styles.cover}
          src={coverImage}
          alt={title}
          width="920"
          height="400"
        />
      )}
      <div className={styles.headerContainer}>
        <div className={styles.authorAndSocialWrapper}>
          <AuthorHeader
            name={author.name}
            date={date}
            profileImage={author.profile_image}
          />
          <div className={styles.socialWrapper}>
            <Interactions postId={_id} />

            <SocialMedia slug={slug} title={title} />
          </div>
        </div>
        <div>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>
    </header>
  )
}
export default PostHeader

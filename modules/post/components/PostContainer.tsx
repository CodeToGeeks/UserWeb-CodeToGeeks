import React from 'react'
import PostBody from './PostBody'
import PostHeader from './PostHeader'
import styles from '../styles/PostContainer.module.scss'
import { Post } from '@models/Post.model'

type ArticleContainerProps = {
  post: Post
}

const ArticleContainer = ({ post }: ArticleContainerProps) => {
  const author = {
    _id: 's',
    name: post.author_name,
    profile_image: post.author_profile_image,
  }

  return (
    <main className={styles.main}>
      <PostHeader
        coverImage={post.cover_image_link}
        title={post.title}
        date={post.created_at}
        author={author}
        tags={[]}
      />
      <PostBody content={post.md} />
    </main>
  )
}

export default ArticleContainer

import React from 'react'
import PostCard from './PostCard'
import styles from '../styles/PostsList.module.scss'
import { Post } from '@models/Post.model'

type PostListProps = { posts: Post[] }

const PostsList = ({ posts }: PostListProps) => {
  return (
    <div className={styles.list}>
      {posts.map((post, i) => (
        <PostCard key={post._id} post={post} hasCover={i == 0} />
      ))}
    </div>
  )
}

export default PostsList

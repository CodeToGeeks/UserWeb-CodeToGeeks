import React from 'react'
import PostCard from './PostCard'
import styles from '../styles/PostsList.module.scss'
import { Post } from '@models/Post.model'

type PostListProps = { posts: Post[] }

const PostsList = ({ posts }: PostListProps) => {
  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  )
}

export default PostsList

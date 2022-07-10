import React from 'react'
import PostCard from './PostCard'
import { Post } from '@models/Post.model'

type PostListProps = { posts: Post[] }

const PostsList = ({ posts }: PostListProps) => {
  return (
    <>
      {posts.map((post, i) => (
        <PostCard key={post._id} post={post} hasCover={i == 0} />
      ))}
    </>
  )
}

export default PostsList

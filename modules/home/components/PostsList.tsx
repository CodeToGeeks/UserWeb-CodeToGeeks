import React, { Dispatch, SetStateAction } from 'react'
import PostCard from './PostCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Post } from '@models/Post.model'
import Loader from './PostCardLoader'

type PostListProps = {
  posts: Post[]
  totalPostsCount: number
  incrementPageNumber: Dispatch<SetStateAction<void>>
  postsIndexWithCover?: number[]
}

const PostsList = ({
  posts,
  totalPostsCount,
  incrementPageNumber,
  postsIndexWithCover = [0],
}: PostListProps) => {
  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={() => incrementPageNumber()}
      hasMore={totalPostsCount > posts.length}
      loader={
        <>
          <Loader />
          <Loader />
          <Loader />
        </>
      }
      endMessage={<p style={{ textAlign: 'center' }}>No More Posts!</p>}
    >
      {posts.map((post, i) => (
        <PostCard
          key={post._id}
          post={post}
          hasCover={postsIndexWithCover.includes(i)}
        />
      ))}
    </InfiniteScroll>
  )
}

export default PostsList

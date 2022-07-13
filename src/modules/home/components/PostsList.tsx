import React, { Dispatch, SetStateAction } from 'react'
import PostCard from './PostCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Post } from '@models/Post.model'
import Loader from './PostCardLoader'
type PostListProps = {
  posts: Post[]
  totalPostsCount: number
  setPageNumber: Dispatch<SetStateAction<number>>
}

const PostsList = ({
  posts,
  totalPostsCount,
  setPageNumber,
}: PostListProps) => {
  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={() => setPageNumber((prev) => prev + 1)}
        hasMore={totalPostsCount > posts.length}
        loader={
          <>
            <Loader />
            <Loader />
            <Loader />
          </>
        }
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {posts.map((post, i) => (
          <PostCard key={post._id} post={post} hasCover={i == 0} />
        ))}
      </InfiniteScroll>
    </>
  )
}

export default PostsList

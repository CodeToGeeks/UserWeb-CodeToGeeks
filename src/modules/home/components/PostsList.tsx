import React, { useEffect, Dispatch, SetStateAction } from 'react'
import PostCard from './PostCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Post } from '@models/Post.model'
import Loader from './PostCardLoader'
import { getTags, postsSelector } from '@store/posts'
import { useAppDispatch, useAppSelector } from '@store/hooks'

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
  const { tags } = useAppSelector(postsSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!tags.length) dispatch(getTags())
  }, [])

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

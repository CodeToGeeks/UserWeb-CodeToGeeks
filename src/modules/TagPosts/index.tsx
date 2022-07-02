import React, { useEffect, useState } from 'react'
import { withRouter, NextRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostsList from '@modules/home/components/PostsList'
import Community from '@modules/home/components/Community'
import PopularTags from '@modules/home/components/PopularTags'
import styles from '@modules/home/styles/index.module.scss'
import Loader from '@modules/home/components/PostCardLoader'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  getTags,
  populatePostsTags,
  resetPosts,
  getPostsByTagId,
  mainSelector,
} from '../../store/main'

// TODO:
//  - fix issue of getting the 1st data twice

const TagPosts = ({ router }: { router: NextRouter }) => {
  const [pageNumber, setPageNumber] = useState(1)
  const dispatch = useAppDispatch()
  const { posts, tags, totalPostsCount } = useAppSelector(mainSelector)
  const { _id } = router.query
  useEffect(() => {
    dispatch(resetPosts())
    if (!tags.length) dispatch(getTags())
  }, [_id])

  useEffect(() => {
    dispatch(
      getPostsByTagId({
        query: { pageSize: 3, pageNumber },
        tagId: `${_id}`,
      }),
    )
  }, [pageNumber, _id])

  useEffect(() => {
    if (posts.length && tags.length) {
      dispatch(populatePostsTags())
    }
  }, [posts, tags])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div style={{ alignSelf: 'flex-start' }}>
          <Community />
          <PopularTags />
        </div>
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
          <PostsList posts={posts} />
        </InfiniteScroll>
      </main>
    </div>
  )
}

export default withRouter(TagPosts)

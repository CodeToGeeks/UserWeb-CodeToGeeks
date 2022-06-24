import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostsList from './components/PostsList'
import Community from './components/Community'
import PopularTags from './components/PopularTags'
import styles from './styles/index.module.scss'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  getPosts,
  getTags,
  populatePostsTags,
  mainSelector,
} from '../../store/main'

// TODO:
//  - fix issue of getting the 1st data twice
//  - add loading state -view
//  - add skeleton

export default function Home() {
  const [pageNumber, setPageNumber] = useState(1)
  const dispatch = useAppDispatch()
  const { posts, tags, totalPostsCount } = useAppSelector(mainSelector)

  useEffect(() => {
    dispatch(getPosts({ pageSize: 3, pageNumber }))
  }, [pageNumber])

  useEffect(() => {
    if (!tags.length) dispatch(getTags())
  }, [])

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
          loader={<h4>Loading...</h4>}
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

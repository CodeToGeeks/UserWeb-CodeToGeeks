import React, { useEffect } from 'react'
import PostsList from './components/PostsList'
import Community from './components/Community'
import PopularTags from './components/PopularTags'
import SEO from '@components/SEO/SEO'

import styles from './styles/index.module.scss'
import { ReduxWrapper } from '@store/store'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  getPosts,
  getTags,
  incrementPageNumber,
  postsSelector,
} from '@store/posts'

import { getUserInteractions } from '@store/interactions'
import { authSelector } from '@store/auth'

const Home = () => {
  const dispatch = useAppDispatch()
  const { posts, pageNumber, totalPostsCount, tags, searchKeyword } =
    useAppSelector(postsSelector)

  const { isAuthenticated, token } = useAppSelector(authSelector)

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(getUserInteractions())
    }
  }, [isAuthenticated, token])

  useEffect(() => {
    if (!tags.length) dispatch(getTags())
  }, [])

  useEffect(() => {
    dispatch(
      getPosts({
        pageSize: 3,
        pageNumber,
        ...(searchKeyword && { search: searchKeyword }),
      }),
    )
  }, [pageNumber, searchKeyword])

  return (
    <div>
      <SEO />
      <div className={styles.container}>
        <main className={styles.main}>
          <div style={{ alignSelf: 'flex-start' }}>
            <Community />
            <PopularTags />
          </div>
          <PostsList
            posts={posts}
            setPageNumber={() => dispatch(incrementPageNumber())}
            totalPostsCount={totalPostsCount}
          />
        </main>
      </div>
    </div>
  )
}

export const getStaticProps = ReduxWrapper.getStaticProps(
  (store) => async () => {
    await store.dispatch(getPosts({ pageSize: 3, pageNumber: 1 }))
    store.dispatch(incrementPageNumber())

    const posts = store.getState().posts.posts
    const totalPostsCount = store.getState().posts.totalPostsCount
    const pageNumber = store.getState().posts.pageNumber

    return {
      props: {
        posts,
        totalPostsCount,
        pageNumber,
      },
    }
  },
)
export default Home

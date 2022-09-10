import React, { useEffect } from 'react'

import PostsList from './components/PostsList'
import Community from './components/Community'
import PopularTags from './components/PopularTags'
import SEO from '@components/SEO/SEO'
import styles from './styles/index.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  getPosts,
  getTags,
  postsSelector,
  incrementPageNumber,
} from '@store/posts'

import { getUserInteractions } from '@store/interactions'
import { authSelector } from '@store/auth'

const Home = () => {
  const dispatch = useAppDispatch()
  const { posts, totalPostsCount, pageNumber, searchKeyword, tags } =
    useAppSelector(postsSelector)
  const { isAuthenticated, token } = useAppSelector(authSelector)

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(getUserInteractions())
    }
  }, [isAuthenticated, token])

  useEffect(() => {
    if (posts.length < totalPostsCount)
      dispatch(
        getPosts({
          pageNumber,
          ...(searchKeyword && { search: searchKeyword }),
        }),
      )
  }, [pageNumber, searchKeyword, totalPostsCount])

  useEffect(() => {
    if (!tags || !tags.length) dispatch(getTags())
  }, [])

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
            incrementPageNumber={() => dispatch(incrementPageNumber())}
            totalPostsCount={totalPostsCount}
          />
        </main>
      </div>
    </div>
  )
}

export default Home

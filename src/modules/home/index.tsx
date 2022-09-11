import React, { useEffect } from 'react'

import PostsList from './components/PostsList'
import Community from './components/Community'
import PopularTags from './components/PopularTags'
import SEO from '@components/SEO/SEO'
import styles from './styles/index.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { resetPosts, getPosts, getTags, postsSelector } from '@store/posts'

import { getUserInteractions } from '@store/interactions'
import { authSelector } from '@store/auth'

const Home = () => {
  const dispatch = useAppDispatch()
  const { posts, totalPostsCount, searchKeyword, tags } =
    useAppSelector(postsSelector)
  const { isAuthenticated, token } = useAppSelector(authSelector)

  useEffect(() => {
    dispatch(resetPosts())
    return () => {
      dispatch(resetPosts())
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(getUserInteractions())
    }
  }, [isAuthenticated, token])

  useEffect(() => {
    getMorePosts()
  }, [searchKeyword])

  useEffect(() => {
    if (!tags || !tags.length) dispatch(getTags())
  }, [])

  const getMorePosts = () =>
    dispatch(
      getPosts({
        ...(searchKeyword && { search: searchKeyword }),
      }),
    )

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
            hasMoreHandler={getMorePosts}
            totalPostsCount={totalPostsCount}
          />
        </main>
      </div>
    </div>
  )
}

export default Home

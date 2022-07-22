import React, { useEffect, useState } from 'react'
import PostsList from './components/PostsList'
import Community from './components/Community'
import PopularTags from './components/PopularTags'
import SEO from '@components/SEO/SEO'

import styles from './styles/index.module.scss'

import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getPosts, getTags, resetPosts, postsSelector } from '@store/posts'

import { getUserInteractions } from '@store/interactions'
import { authSelector } from '@store/auth'

const Home = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const dispatch = useAppDispatch()
  const { posts, tags, totalPostsCount, searchKeyword } =
    useAppSelector(postsSelector)

  const { isAuthenticated, token } = useAppSelector(authSelector)

  useEffect(() => {
    setPageNumber(1)
    dispatch(resetPosts())
  }, [searchKeyword])

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
    <>
      <SEO />
      <div className={styles.container}>
        <main className={styles.main}>
          <div style={{ alignSelf: 'flex-start' }}>
            <Community />
            <PopularTags />
          </div>
          <PostsList
            posts={posts}
            setPageNumber={setPageNumber}
            totalPostsCount={totalPostsCount}
          />
        </main>
      </div>
    </>
  )
}

export default Home

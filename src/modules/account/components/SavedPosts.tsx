import React, { useEffect } from 'react'
import PostsList from '@modules/home/components/PostsList'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authSelector } from '@store/auth'
import { resetSavedPosts, getSavedPosts, accountSelector } from '@store/account'
import { getUserInteractions } from '@store/interactions'
import styles from '../styles/index.module.scss'

const SavedPosts = () => {
  const { savedPosts, totalPostsCount } = useAppSelector(accountSelector)
  const { token, isAuthenticated } = useAppSelector(authSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetSavedPosts())
  }, [])

  useEffect(() => {
    if (!token) return
    getMoreSavedPosts()
  }, [token])

  const getMoreSavedPosts = () => dispatch(getSavedPosts({}))

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(getUserInteractions())
    }
  }, [isAuthenticated, token])

  return (
    <main className={styles.savedPostsContainer}>
      <h1 className={`title-underline ${styles.title}`}> Reading List</h1>
      <PostsList
        posts={savedPosts}
        hasMoreHandler={getMoreSavedPosts}
        totalPostsCount={totalPostsCount}
        postsIndexWithCover={[]}
      />
    </main>
  )
}
export default SavedPosts

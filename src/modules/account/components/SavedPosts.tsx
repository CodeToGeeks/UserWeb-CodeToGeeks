import React, { useEffect } from 'react'
import PostsList from '@modules/home/components/PostsList'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authSelector } from '@store/auth'
import {
  resetSavedPosts,
  getSavedPosts,
  accountSelector,
  incrementPageNumber,
} from '@store/account'
import { getUserInteractions } from '@store/interactions'
import styles from '../styles/index.module.scss'

const SavedPosts = () => {
  const { savedPosts, totalPostsCount, pageNumber } =
    useAppSelector(accountSelector)
  const { token, isAuthenticated } = useAppSelector(authSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetSavedPosts())
  }, [])

  useEffect(() => {
    if (!token) return
    dispatch(
      getSavedPosts({
        pageNumber,
      }),
    )
  }, [token, pageNumber])

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
        incrementPageNumber={() => dispatch(incrementPageNumber())}
        totalPostsCount={totalPostsCount}
        postsIndexWithCover={[]}
      />
    </main>
  )
}
export default SavedPosts

import React, { useEffect, useState } from 'react'
import PostsList from '@modules/home/components/PostsList'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authSelector } from '@store/auth'
import { getSavedPosts, accountSelector } from '@store/account'
import { getUserInteractions } from '@store/interactions'

const SavedPosts = () => {
  const { savedPosts, totalPostsCount } = useAppSelector(accountSelector)
  const { token, isAuthenticated } = useAppSelector(authSelector)
  const dispatch = useAppDispatch()

  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    if (!token) return
    dispatch(
      getSavedPosts({
        pageSize: 3,
        pageNumber: pageNumber,
      }),
    )
  }, [token, pageNumber])

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(getUserInteractions())
    }
  }, [isAuthenticated, token])

  return (
    <PostsList
      posts={savedPosts}
      setPageNumber={setPageNumber}
      totalPostsCount={totalPostsCount}
      postsIndexWithCover={[]}
    />
  )
}
export default SavedPosts

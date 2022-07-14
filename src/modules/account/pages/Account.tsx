import React, { useEffect, useState } from 'react'
import styles from '../styles/Account.module.scss'

import PostsList from '@modules/home/components/PostsList'

import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authSelector } from '@store/auth'
import { getSavedPosts, accountSelector } from '@store/account'
import { getUserInteractions } from '@store/interactions'

const Account = () => {
  const { savedPosts, totalPostsCount } = useAppSelector(accountSelector)
  const { token, isAuthenticated } = useAppSelector(authSelector)
  const dispatch = useAppDispatch()

  const [tab, setTab] = useState<'savedPosts' | 'about'>('savedPosts')
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
    <div className={styles.container}>
      <h1 className={styles.title}> Wagdy Samih Beshir</h1>
      <ul className={styles.nav}>
        <li
          className={`hover-line ${tab === 'savedPosts' ? styles.active : ''}`}
        >
          <button onClick={() => setTab('savedPosts')}>Saved Posts</button>
        </li>
        <li className={`hover-line ${tab === 'about' ? styles.active : ''}`}>
          <button onClick={() => setTab('about')}>About</button>
        </li>
      </ul>
      <div>
        <PostsList
          posts={savedPosts}
          setPageNumber={setPageNumber}
          totalPostsCount={totalPostsCount}
          postsIndexWithCover={[]}
        />
      </div>
    </div>
  )
}
export default Account

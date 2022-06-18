import React, { useEffect } from 'react'
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

export default function Home() {
  const dispatch = useAppDispatch()
  const { posts, tags } = useAppSelector(mainSelector)

  useEffect(() => {
    if (!posts.length) dispatch(getPosts())
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
        <PostsList posts={posts} />
      </main>
    </div>
  )
}

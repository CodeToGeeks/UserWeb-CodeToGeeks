import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
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
  const { posts, totalPostsCount, tags, searchKeyword } =
    useAppSelector(postsSelector)
  const { isAuthenticated, token } = useAppSelector(authSelector)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(getUserInteractions())
    }
  }, [isAuthenticated, token])

  useEffect(() => {
    if (!tags.length) dispatch(getTags())
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
            setPageNumber={() => router.replace(router.asPath)}
            totalPostsCount={totalPostsCount}
          />
        </main>
      </div>
    </div>
  )
}
let cnt = 0
export const getServerSideProps: any = ReduxWrapper.getServerSideProps(
  (store) => async () => {
    const tags = store.getState().posts.tags
    if (!tags.length) store.dispatch(getTags())

    const pageNumber = store.getState().posts.pageNumber

    await store.dispatch(getPosts({ pageSize: 3, pageNumber }))
    store.dispatch(incrementPageNumber())

    const posts = store.getState().posts.posts
    const totalPostsCount = store.getState().posts.totalPostsCount
    console.log('page', pageNumber, 'posts count', posts.length)
    console.log(cnt++)

    return {
      props: {
        posts,
        totalPostsCount,
        pageNumber,
        tags,
      },
    }
  },
)
export default Home

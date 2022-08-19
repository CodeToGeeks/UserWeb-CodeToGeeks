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
  setSearchKeyword,
} from '@store/posts'

import { getUserInteractions } from '@store/interactions'
import { authSelector } from '@store/auth'

const Home = () => {
  const dispatch = useAppDispatch()
  const { posts, totalPostsCount, searchKeyword } =
    useAppSelector(postsSelector)
  const { isAuthenticated, token } = useAppSelector(authSelector)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(getUserInteractions())
    }
  }, [isAuthenticated, token])

  useEffect(() => {
    router.replace({
      pathname: router.basePath,
      query: {
        ...(searchKeyword && { search: searchKeyword }),
      },
    })
  }, [searchKeyword])

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
            setPageNumber={() =>
              router.push(router.asPath, undefined, { scroll: false })
            }
            totalPostsCount={totalPostsCount}
          />
        </main>
      </div>
    </div>
  )
}

export const getServerSideProps = ReduxWrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      const tags = store.getState().posts.tags
      if (!tags.length) store.dispatch(getTags())

      const isSearchKeywordChanged =
        query.search !== store.getState().posts.searchKeyword &&
        (query.search || store.getState().posts.searchKeyword)
      if (isSearchKeywordChanged) {
        console.log('search keyword changed')
        store.dispatch(setSearchKeyword(query.search || ''))
      }

      const pageNumber = store.getState().posts.pageNumber
      const searchKeyword = store.getState().posts.searchKeyword

      await store.dispatch(
        getPosts({
          pageSize: 3,
          pageNumber: store.getState().posts.pageNumber,
          ...(searchKeyword && { search: searchKeyword }),
        }),
      )
      console.log({
        pageSize: 3,
        pageNumber: store.getState().posts.pageNumber,
        ...(searchKeyword && { search: searchKeyword }),
      })
      store.dispatch(incrementPageNumber())

      const posts = store.getState().posts.posts
      const totalPostsCount = store.getState().posts.totalPostsCount

      return {
        props: {
          posts,
          totalPostsCount,
          searchKeyword,
          pageNumber,
          tags,
        },
      }
    },
)
export default Home

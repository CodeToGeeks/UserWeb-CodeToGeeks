import React from 'react'

import AuthorDetails from './components/AuthorDetails'
import PostContainer from './components/PostContainer'
import styles from './styles/index.module.scss'

import { useAppSelector } from '@store/hooks'
import {
  getPostDetails,
  getPosts,
  postsSelector,
  resetPosts,
} from '@store/posts'
import PostLoader from './components/PostLoader'
import AuthorDetailsLoader from './components/AuthorDetailsLoader'
import SEO from '@components/SEO/SEO'
import { ReduxWrapper, store } from '@store/store'
import { GetStaticPaths, GetStaticProps } from 'next'

const PostDetails = () => {
  const { post, isLoading } = useAppSelector(postsSelector)

  return (
    <div className={`${styles.mainWrapper} ${styles.post}`}>
      {post && !isLoading ? (
        <>
          <SEO
            title={`${post.title} | Code To Geeks`}
            description={post.excerpt}
            image={post.cover_image_link}
          />
          <PostContainer post={post} />
          <AuthorDetails
            author={{
              _id: '',
              name: post.author_name,
              profile_image: post.author_profile_image,
            }}
            date={new Date(post.created_at)}
          />
        </>
      ) : (
        <>
          <PostLoader />
          <AuthorDetailsLoader />
        </>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = ReduxWrapper.getStaticProps(
  (store) => async (context) => {
    const slug = context.params?.slug

    if (typeof slug === 'string') {
      await store.dispatch(getPostDetails({ slug }))
    }

    const post = store.getState().posts.post
    return {
      props: { post },
    }
  },
)

export const getStaticPaths: GetStaticPaths = async () => {
  // pre-render 1st page of posts list only
  const isTherePosts = store.getState().posts.posts.length > 0
  if (!isTherePosts) {
    store.dispatch(resetPosts())
    await store.dispatch(getPosts({ pageSize: 3, pageNumber: 1 }))
  }

  const postsIds = store
    .getState()
    .posts.posts.map((post) => ({ params: { slug: post.slug } }))

  // console.log(postsIds)
  return {
    paths: postsIds,
    fallback: true,
  }
}

export default PostDetails

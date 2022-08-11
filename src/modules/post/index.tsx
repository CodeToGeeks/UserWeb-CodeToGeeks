import React, { useEffect } from 'react'

import AuthorDetails from './components/AuthorDetails'
import PostContainer from './components/PostContainer'
import styles from './styles/index.module.scss'

import { useAppDispatch, useAppSelector } from '@store/hooks'
import { getPostDetails, postsSelector } from '@store/posts'
import PostLoader from './components/PostLoader'
import AuthorDetailsLoader from './components/AuthorDetailsLoader'
import SEO from '@components/SEO/SEO'

type PostDetailsProps = {
  slug: string | string[] | undefined
}

const PostDetails = ({ slug }: PostDetailsProps) => {
  const dispatch = useAppDispatch()
  const { post, isLoading } = useAppSelector(postsSelector)

  useEffect(() => {
    if (typeof slug == 'string') dispatch(getPostDetails({ slug }))
  }, [slug])

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

export default PostDetails

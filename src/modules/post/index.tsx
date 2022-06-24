import React, { useEffect } from 'react'

import AuthorDetails from './components/AuthorDetails'
import Interactions from './components/Interactions'
import PostContainer from './components/PostContainer'
import styles from './styles/index.module.scss'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { getPostDetails, mainSelector } from '../../store/main'

type PostDetailsProps = {
  slug: string | string[] | undefined
}

const PostDetails = ({ slug }: PostDetailsProps) => {
  const dispatch = useAppDispatch()
  const { post } = useAppSelector(mainSelector)

  useEffect(() => {
    if (typeof slug == 'string') dispatch(getPostDetails({ slug }))
  }, [])

  return post ? (
    <div className={`${styles.mainWrapper} ${styles.post}`}>
      <Interactions />
      <PostContainer post={post} />
      <AuthorDetails
        author={{
          _id: '',
          name: post.author_name,
          profile_image: post.author_profile_image,
        }}
        date={new Date(post.created_at)}
      />
    </div>
  ) : null
}

export default PostDetails

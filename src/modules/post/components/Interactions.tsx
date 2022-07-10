import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Interactions.module.scss'
import { Post } from '@models/Post.model'

import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authSelector } from '@store/auth'
import { interactionsSelector } from '@store/interactions'
import { openLoginModal } from '@store/ui'
import { lovePost, unlovePost, savePost, unsavePost } from '@store/interactions'

const Interactions = ({ post }: { post: Post }) => {
  const [isSaved, setIsSaved] = useState(false)
  const [isLoved, setIsLoved] = useState(false)

  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector(authSelector)
  const { savedPostsIds, lovedPostsIds } = useAppSelector(interactionsSelector)

  useEffect(() => {
    if (!isAuthenticated) return
    setIsSaved(savedPostsIds.includes(post._id))
    setIsLoved(lovedPostsIds.includes(post._id))
  }, [lovedPostsIds, savedPostsIds, post, isAuthenticated])

  const onClickSaveHandler = () => {
    if (!isAuthenticated) return dispatch(openLoginModal())
    if (!isSaved) {
      dispatch(savePost(post._id))
    } else {
      dispatch(unsavePost(post._id))
    }
  }
  const onClickLoveHandler = () => {
    if (!isAuthenticated) return dispatch(openLoginModal())
    if (!isLoved) {
      dispatch(lovePost(post._id))
    } else {
      dispatch(unlovePost(post._id))
    }
  }
  return (
    <div className={styles.interactionsWrapper}>
      <div>
        <button onClick={onClickLoveHandler}>
          <Image
            src={`/assets/interactions/heart${isLoved ? '-red' : ''}.svg`}
            alt="heart icon"
            width="40"
            height="40"
          />
        </button>
        <div>{post.love_count}</div>
      </div>
      <div>
        <button onClick={onClickSaveHandler}>
          <Image
            src={'/assets/interactions/flag.svg'}
            alt="flag icon"
            width="40"
            height="40"
          />
        </button>
        <div>{post.love_count}</div>
      </div>
      <div>
        <button>
          <Image
            src={'/assets/interactions/dots.svg'}
            alt="3 dots icon"
            width="40"
            height="40"
          />
        </button>
      </div>
    </div>
  )
}
export default Interactions

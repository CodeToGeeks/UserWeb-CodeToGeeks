import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Interactions.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { postsSelector } from '@store/posts'
import { authSelector } from '@store/auth'
import { interactionsSelector } from '@store/interactions'
import { openLoginModal } from '@store/ui'
import { lovePost, unlovePost, savePost, unsavePost } from '@store/interactions'

const Interactions = () => {
  const [isSaved, setIsSaved] = useState(false)
  const [isLoved, setIsLoved] = useState(false)

  const dispatch = useAppDispatch()
  const { post } = useAppSelector(postsSelector)
  const { isAuthenticated } = useAppSelector(authSelector)
  const { savedPostsIds, lovedPostsIds } = useAppSelector(interactionsSelector)

  useEffect(() => {
    if (!isAuthenticated || !post) return
    setIsSaved(savedPostsIds.includes(post._id))
    setIsLoved(lovedPostsIds.includes(post._id))
  }, [lovedPostsIds, savedPostsIds, post, isAuthenticated])

  const onClickSaveHandler = () => {
    if (!post) return
    if (!isAuthenticated) return dispatch(openLoginModal())
    if (!isSaved) {
      dispatch(savePost(post._id))
    } else {
      dispatch(unsavePost(post._id))
    }
  }
  const onClickLoveHandler = () => {
    if (!post) return
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
            src={`/assets/post/heart2${isLoved ? '-red' : ''}.svg`}
            alt="heart icon"
            width="26"
            height="26"
          />
        </button>
      </div>
      <div>
        <button onClick={onClickSaveHandler}>
          <Image
            src={'/assets/post/flag.svg'}
            alt="flag icon"
            width="26"
            height="26"
          />
        </button>
      </div>
    </div>
  )
}
export default Interactions

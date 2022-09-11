import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../styles/Interactions.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authSelector } from '@store/auth'
import { interactionsSelector } from '@store/interactions'
import { openLoginModal } from '@store/ui'
import { lovePost, unlovePost, savePost, unsavePost } from '@store/interactions'

type InteractionsProps = {
  postId: string
}
const Interactions = ({ postId }: InteractionsProps) => {
  const [isSaved, setIsSaved] = useState(false)
  const [isLoved, setIsLoved] = useState(false)

  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector(authSelector)
  const { savedPostsIds, lovedPostsIds } = useAppSelector(interactionsSelector)

  useEffect(() => {
    if (!isAuthenticated || !postId) return
    setIsSaved(savedPostsIds.includes(postId))
    setIsLoved(lovedPostsIds.includes(postId))
  }, [lovedPostsIds, savedPostsIds, postId, isAuthenticated])

  const onClickSaveHandler = () => {
    if (!postId) return
    if (!isAuthenticated) return dispatch(openLoginModal())
    if (!isSaved) {
      dispatch(savePost(postId))
    } else {
      dispatch(unsavePost(postId))
    }
  }
  const onClickLoveHandler = () => {
    if (!postId) return
    if (!isAuthenticated) return dispatch(openLoginModal())
    if (!isLoved) {
      dispatch(lovePost(postId))
    } else {
      dispatch(unlovePost(postId))
    }
  }
  return (
    <div className={styles.interactionsWrapper}>
      <div>
        <button
          onClick={onClickLoveHandler}
          className={isLoved ? styles.selected : ''}
        >
          <Image
            src={`/assets/post/heart${isLoved ? '-filled' : ''}.svg`}
            alt="heart icon"
            width="26"
            height="26"
          />
        </button>
      </div>
      <div>
        <button
          onClick={onClickSaveHandler}
          className={isSaved ? styles.selected : ''}
        >
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

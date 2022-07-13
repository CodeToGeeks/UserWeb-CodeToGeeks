import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PostTags from '@components/PostTags/PostTags'
import AuthorHeader from '@components/AuthorHeader/AuthorHeader'
import styles from '../styles/PostCard.module.scss'
import { Post } from '@models/Post.model'
import { Tag } from '@models/Tag.model'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authSelector } from '@store/auth'
import { postsSelector } from '@store/posts'
import { openLoginModal } from '@store/ui'
import {
  lovePost,
  unlovePost,
  savePost,
  unsavePost,
  interactionsSelector,
} from '@store/interactions'
type PostCardProps = { post: Post; hasCover: boolean }

const PostCard = ({ post, hasCover }: PostCardProps) => {
  const [postTags, setPostTags] = useState<Tag[]>([])
  const [isSaved, setIsSaved] = useState(false)
  const [isLoved, setIsLoved] = useState(false)

  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector(authSelector)
  const { savedPostsIds, lovedPostsIds } = useAppSelector(interactionsSelector)
  const { tags } = useAppSelector(postsSelector)

  useEffect(() => {
    if (!isAuthenticated) return
    setIsSaved(savedPostsIds.includes(post._id))
    setIsLoved(lovedPostsIds.includes(post._id))
  }, [lovedPostsIds, savedPostsIds, post, isAuthenticated])

  useEffect(() => {
    if (!tags.length || !post.tags) return
    const postTags = tags.filter((tag: Tag) => post.tags.includes(tag._id))
    setPostTags(postTags)
  }, [tags, post])

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
    <>
      {hasCover && (
        <Image
          className={styles.postCover}
          src={post.cover_image_link}
          width="748"
          height={'250'}
          priority={true}
          objectFit={'cover'}
        />
      )}
      <section
        className={`${styles.container} ${
          hasCover ? styles.postWithCoverContainer : ''
        }`}
      >
        <AuthorHeader
          name={post.author_name}
          profileImage={post.author_profile_image}
          date={post.created_at}
        />

        <div className={styles.blogBody}>
          <div className={styles.blogTitle}>
            <Link href={`/posts/${post.slug}`}>
              <a href="#">{post.title}</a>
            </Link>
          </div>
          <PostTags tags={postTags} />
        </div>

        <div className={styles.blogFooter}>
          <div className={styles.interactionContainer}>
            <button
              className={styles.interactionBtn}
              onClick={onClickLoveHandler}
            >
              <Image
                src={`/assets/post/heart${isLoved ? '-filled' : ''}.svg`}
                alt="love icon"
                width={'24'}
                height={'24'}
              />
              <span>{post.love_count} Reactions</span>
            </button>
          </div>
          <div>
            <span className={styles.readingInfo}>
              {post.count_minutes_read || 10} mins read
            </span>
            <button className={styles.saveButton} onClick={onClickSaveHandler}>
              {isSaved ? 'Unsaved' : 'Save'}
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default PostCard

import React from 'react'
import Link from 'next/link'
import PostTags from '@components/PostTags/PostTags'
import AuthorHeader from '@components/AuthorHeader/AuthorHeader'
import styles from '../styles/PostCard.module.scss'
import { Post } from '@models/Post.model'

type PostCardProps = { post: Post }

const PostCard = ({ post }: PostCardProps) => {
  return (
    <section className={styles.container}>
      <AuthorHeader author={post.author} date={post.created_at} />

      <div className={styles.blogBody}>
        <div className={styles.blogTitle}>
          <Link href={`/articles/${post.slug}`}>
            <a href="#">{post.title}</a>
          </Link>
        </div>
        <PostTags tags={post.tags} />
      </div>

      <div className={styles.blogFooter}>
        <div className={styles.interactionContainer}>
          <button className={styles.interactionBtn}>
            <img
              className={styles.icon}
              src="/assets/home/heart.svg"
              alt="comment"
            />
            <span>1800 Reactions</span>
          </button>
          <button className={styles.interactionBtn}>
            <img
              className={styles.icon}
              src="/assets/home/comment.svg"
              alt="comment"
            />
            <span>180 comments</span>
          </button>
        </div>
        <div>
          <span className={styles.readingInfo}> 15 mins read</span>
          <button className={styles.saveButton}>Save</button>
        </div>
      </div>
    </section>
  )
}

export default PostCard

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PostTags from '@components/PostTags/PostTags'
import AuthorHeader from '@components/AuthorHeader/AuthorHeader'
import styles from '../styles/PostCard.module.scss'
import { Post } from '@models/Post.model'

type PostCardProps = { post: Post }

const PostCard = ({ post }: PostCardProps) => {
  return (
    <section className={styles.container}>
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
        <PostTags tags={post.tags} />
      </div>

      <div className={styles.blogFooter}>
        <div className={styles.interactionContainer}>
          <button className={styles.interactionBtn}>
            <Image
              className={styles.icon}
              src="/assets/home/heart.svg"
              alt="comment"
              width={'30'}
              height={'30'}
            />
            <span>{post.love_count} Reactions</span>
          </button>
        </div>
        <div>
          <span className={styles.readingInfo}>
            {post.count_minutes_read || 10} mins read
          </span>
          <button className={styles.saveButton}>Save</button>
        </div>
      </div>
    </section>
  )
}

export default PostCard

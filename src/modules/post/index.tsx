import React from 'react'
import AuthorDetails from './components/AuthorDetails'
import PostContainer from './components/PostContainer'
import styles from './styles/index.module.scss'
import PostLoader from './components/PostLoader'
import AuthorDetailsLoader from './components/AuthorDetailsLoader'
import SEO from '@components/SEO/SEO'

const PostDetails = ({ post }: any) => {
  return (
    <div className={`${styles.mainWrapper} ${styles.post}`}>
      {post ? (
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
              bio: post.author_bio,
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

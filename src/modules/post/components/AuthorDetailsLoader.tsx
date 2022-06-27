import React from 'react'
import ContentLoader from 'react-content-loader'
import styles from '../styles/AuthorDetails.module.scss'

const PostLoader = () => (
  <div className={styles.authorContainer}>
    <ContentLoader
      speed={2}
      width={200}
      height={400}
      viewBox="0 0 200 400"
      backgroundColor="#d6d6d7"
      foregroundColor="#f9f9f9"
    >
      <circle cx="40" cy="40" r="40" />
      <rect x="0" y="110" rx="5" ry="5" width="150" height="10" />
      <rect x="0" y="140" rx="5" ry="5" width="110" height="10" />
      <rect x="0" y="180" rx="5" ry="5" width="200" height="10" />
      <rect x="0" y="210" rx="5" ry="5" width="200" height="10" />
    </ContentLoader>
  </div>
)

export default PostLoader

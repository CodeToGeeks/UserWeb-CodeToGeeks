import React from 'react'
import ContentLoader from 'react-content-loader'
import styles from '../styles/Interactions.module.scss'

const PostLoader = () => (
  <div className={styles.interactionsLoaderContainer}>
    <ContentLoader
      speed={2}
      width={120}
      height={500}
      viewBox="0 0 120 500"
      backgroundColor="#d6d6d7"
      foregroundColor="#f9f9f9"
    >
      <circle cx="45" cy="30" r="20" />
      <rect x="25" y="65" rx="5" ry="5" width="40" height="10" />
      <circle cx="45" cy="120" r="20" />
      <rect x="25" y="155" rx="5" ry="5" width="40" height="10" />
      <rect x="25" y="210" rx="5" ry="5" width="40" height="10" />
    </ContentLoader>
  </div>
)

export default PostLoader

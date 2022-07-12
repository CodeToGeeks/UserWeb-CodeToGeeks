import React from 'react'
import ContentLoader from 'react-content-loader'
import styles from '../styles/PostContainer.module.scss'

const PostLoader = () => (
  <div className={styles.mainLoader}>
    <ContentLoader
      speed={2}
      width={900}
      height={1000}
      viewBox="0 0 900 1000"
      backgroundColor="#d6d6d7"
      foregroundColor="#f9f9f9"
    >
      {/* cover image */}
      <rect x="0" y="0" rx="5" ry="5" width="899" height="400" />
      <rect x="0" y="395" rx="0" ry="0" width="899" height="5" />

      {/* Author info */}
      <circle cx="70" cy="458" r="26" />
      <rect x="110" y="440" rx="5" ry="5" width="100" height="10" />
      <rect x="110" y="464" rx="5" ry="5" width="70" height="10" />

      {/* title */}
      <rect x="50" y="550" rx="8" ry="8" width="500" height="16" />

      {/* body */}
      <rect x="50" y="640" rx="8" ry="8" width="750" height="11" />
      <rect x="50" y="670" rx="8" ry="8" width="750" height="11" />
      <rect x="50" y="700" rx="8" ry="8" width="750" height="11" />
      <rect x="50" y="730" rx="8" ry="8" width="750" height="11" />
      <rect x="50" y="760" rx="8" ry="8" width="750" height="11" />
      <rect x="50" y="790" rx="8" ry="8" width="750" height="11" />
      <rect x="50" y="820" rx="8" ry="8" width="750" height="11" />
    </ContentLoader>
  </div>
)

export default PostLoader

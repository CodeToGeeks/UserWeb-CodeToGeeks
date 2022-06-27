import React from 'react'
import ContentLoader from 'react-content-loader'

import styles from '../styles/PostCard.module.scss'
const PostCardLoader = () => (
  <div className={styles.loader}>
    <ContentLoader
      speed={2}
      width={640}
      height={200}
      viewBox="0 0 640 200"
      backgroundColor="#d6d6d7"
      foregroundColor="#f9f9f9"
    >
      <circle cx="26" cy="26" r="26" />
      <rect x="65" y="10" rx="5" ry="5" width="88" height="8" />
      <rect x="65" y="30" rx="5" ry="5" width="52" height="8" />

      <rect x="65" y="62" rx="5" ry="5" width="540" height="12" />
      <rect x="65" y="85" rx="5" ry="5" width="540" height="12" />

      <rect x="65" y="140" rx="5" ry="5" width="65" height="10" />
      <rect x="155" y="140" rx="5" ry="5" width="65" height="10" />
      <rect x="245" y="140" rx="5" ry="5" width="65" height="10" />
      <rect x="335" y="140" rx="5" ry="5" width="65" height="10" />

      <rect x="65" y="175" rx="5" ry="5" width="65" height="10" />
      <rect x="540" y="175" rx="5" ry="5" width="65" height="10" />
      <rect x="450" y="175" rx="5" ry="5" width="65" height="10" />
    </ContentLoader>
  </div>
)

export default PostCardLoader

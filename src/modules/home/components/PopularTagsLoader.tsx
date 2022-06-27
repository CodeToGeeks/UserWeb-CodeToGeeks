import React from 'react'
import ContentLoader from 'react-content-loader'
import styles from '../styles/PopularTags.module.scss'
const PopularTagsLoader = () => (
  <div className={styles.loader}>
    <ContentLoader
      speed={2}
      width={400}
      height={250}
      viewBox="0 0 400 250"
      backgroundColor="#d6d6d7"
      foregroundColor="#f9f9f9"
    >
      <rect x="0" y="10" rx="5" ry="5" width="140" height="10" />
      <rect x="0" y="40" rx="5" ry="5" width="140" height="10" />
      <rect x="0" y="70" rx="5" ry="5" width="140" height="10" />
      <rect x="0" y="100" rx="5" ry="5" width="140" height="10" />
      <rect x="0" y="130" rx="5" ry="5" width="140" height="10" />
      <rect x="0" y="160" rx="5" ry="5" width="140" height="10" />
      <rect x="0" y="190" rx="5" ry="5" width="140" height="10" />
      <rect x="0" y="220" rx="5" ry="5" width="140" height="10" />
    </ContentLoader>
  </div>
)

export default PopularTagsLoader

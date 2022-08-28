import React from 'react'
import ContentLoader from 'react-content-loader'
import styles from '../styles/PopularTags.module.scss'
const PopularTagsLoader = () => (
  <div className={styles.loader}>
    <ContentLoader
      uniqueKey="popular-tags"
      speed={2}
      width={400}
      height={250}
      viewBox="0 0 400 250"
      backgroundColor="#d6d6d7"
      foregroundColor="#f9f9f9"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i, index) => (
        <rect
          key={index}
          x="0"
          y={10 + i * 30}
          rx="5"
          ry="5"
          width="140"
          height="10"
        />
      ))}
    </ContentLoader>
  </div>
)

export default PopularTagsLoader

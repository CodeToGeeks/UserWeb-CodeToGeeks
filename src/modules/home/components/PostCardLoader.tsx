import React, { useState, useEffect } from 'react'
import ContentLoader from 'react-content-loader'
import { useWindowSize } from '@hooks/userWindowWidth'

import styles from '../styles/PostCard.module.scss'
const PostCardLoader = () => {
  const { width } = useWindowSize()
  const [startPadding, setStartPadding] = useState(
    65,
    // typeof window !== 'undefined' && window.innerWidth < 950 ? 0 : 65
  )
  useEffect(() => {
    setStartPadding(width < 950 ? 0 : 65)
  }, [width])

  return (
    <div className={styles.loader}>
      <ContentLoader
        title={'load'}
        uniqueKey={'load'}
        speed={2}
        width={'100%'}
        height={'200'}
        backgroundColor="#d6d6d7"
        foregroundColor="#f9f9f9"
        preserveAspectRatio="none"
        style={{ width: '100%' }}
      >
        <circle cx="26" cy="26" r={'26'} />

        <rect x="65" y="10" rx="5" ry="5" width="88" height="8" />
        <rect x="65" y="30" rx="5" ry="5" width="52" height="8" />
        <rect x={startPadding} y="65" rx="5" ry="5" width="90%" height="12" />
        <rect x={startPadding} y="88" rx="5" ry="5" width="90%" height="12" />
        {[0, 1, 2].map((v, i) => (
          <rect
            key={i}
            x={startPadding + i * 100}
            y="140"
            rx="5"
            ry="5"
            width="70"
            height="10"
          />
        ))}
        <rect x={startPadding} y="175" rx="5" ry="5" width="12%" height="10" />
        <rect x="76%" y="175" rx="5" ry="5" width="12%" height="10" />
        <rect x="90%" y="175" rx="5" ry="5" width="10%" height="10" />
      </ContentLoader>
    </div>
  )
}
export default PostCardLoader

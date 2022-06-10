import React from 'react'
import PostsList from './components/PostsList'
import Community from './components/Community'
import PopularTags from './components/PopularTags'
import styles from './styles/index.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div style={{ alignSelf: 'flex-start' }}>
          <Community />
          <PopularTags />
        </div>
        <PostsList />
      </main>
    </div>
  )
}

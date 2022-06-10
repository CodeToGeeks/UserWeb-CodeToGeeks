import React from 'react'
import styles from '../styles/PopularTags.module.scss'

const tags = [
  '#CSS',
  '#JavaScript',
  '#TypeScript',
  '#HTML',
  '#MongoDB',
  '#SQL',
  '#NextJS',
]

const PopularTags = () => {
  return (
    <section className={styles.popularTags}>
      <h2 className={styles.title}> Popular Tags </h2>
      <ul>
        {tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </section>
  )
}

export default PopularTags

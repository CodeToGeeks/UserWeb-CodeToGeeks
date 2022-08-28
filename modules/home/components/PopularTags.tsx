import React from 'react'
import Link from 'next/link'
import styles from '../styles/PopularTags.module.scss'
import { useAppSelector } from '@store/hooks'
import { postsSelector } from '@store/posts'
import { Tag } from '@models/Tag.model'
import PopularTagsLoader from './PopularTagsLoader'

const PopularTags = () => {
  const { tags } = useAppSelector(postsSelector)
  return (
    <section className={styles.popularTags}>
      <h2 className={`title-underline ${styles.title}`}> Popular Tags </h2>
      <ul>
        {tags?.length ? (
          tags.map((tag: Tag) => (
            <li key={tag._id}>
              <Link href={`/tags/${tag._id}`}>{tag.name}</Link>
            </li>
          ))
        ) : (
          <PopularTagsLoader />
        )}
      </ul>
    </section>
  )
}

export default PopularTags

import React from 'react'
import styles from './PostTags.module.scss'
import { Tag as TagModel } from '@models/Tag.model'
import Tag from './Tag'

type AppProps = {
  tags: TagModel[]
  style?: string
}

const PostTags = ({ tags, style = '' }: AppProps) => {
  return (
    <ul className={`${styles.blogTags} ${style}`}>
      {tags.map((tag: TagModel) => (
        <Tag key={tag._id} tag={tag} />
      ))}
    </ul>
  )
}

export default PostTags

import React, { useState } from 'react'
import Link from 'next/link'
import styles from './PostTags.module.scss'
import { Tag } from '@models/Tag.model'

type TagProps = {
  tag: Tag
}

const Tag = ({ tag }: TagProps) => {
  const [onHover, setOnHover] = useState(false)

  const getHoverStyle = (tag: Tag) => {
    return {
      backgroundColor: `${tag.color}33`,
      border: `1px solid ${tag.color}`,
    }
  }
  return (
    <li
      key={tag._id}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      className={styles.blogTagItem}
      style={{
        ...(onHover ? getHoverStyle(tag) : ``),
      }}
    >
      <Link href={`/tags/${tag._id}`}>
        <div>
          <span style={{ color: tag.color }}>#</span>
          {tag.name}
        </div>
      </Link>
    </li>
  )
}

export default Tag

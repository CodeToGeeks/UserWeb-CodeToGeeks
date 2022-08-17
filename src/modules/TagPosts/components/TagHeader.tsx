import React from 'react'
import styles from '../styles/TagHeader.module.scss'
import { Tag } from '@models/Tag.model'
import Card from '@components/ui/Card'
type TagHeaderProps = {
  tag: Tag
}
const TagHeader = ({ tag }: TagHeaderProps) => {
  return (
    <Card
      containerStyles={styles.container}
      style={{ borderLeft: `10px solid ${tag.color}` }}
    >
      <header>
        <h1 className={styles.title}>{tag.name}</h1>
        <p className={styles.description}>{tag.description}</p>
      </header>
    </Card>
  )
}

export default TagHeader

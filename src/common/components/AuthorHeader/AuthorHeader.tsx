import React from 'react'
import Image from 'next/image'
import styles from './AuthorHeader.module.scss'

type AuthorHeaderProps = {
  name: string
  profileImage: string
  date: Date
}

const AuthorHeader = ({ name, profileImage, date }: AuthorHeaderProps) => {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })
  return (
    <div className={styles.blogHeader}>
      <div className={styles.imgContainer}>
        <Image src={profileImage} alt={name} width="200" height="200" />
      </div>
      <div className={styles.info}>
        <div>{name}</div>
        <div>{formattedDate}</div>
      </div>
    </div>
  )
}

export default AuthorHeader

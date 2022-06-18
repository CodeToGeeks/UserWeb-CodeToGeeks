import React from 'react'
import Image from 'next/image'
import { Author } from '@models/Author.model'
import styles from '../styles/AuthorDetails.module.scss'

type AuthorDetailsProps = {
  author: Author
  date?: Date
}

const AuthorDetails = ({ author }: AuthorDetailsProps) => {
  const about = 'I am so cool! no one is cool as me as you see'
  console.log({
    xx: author.profile_image,
  })
  return (
    <aside className={styles.authorContainer}>
      <Image
        src={author.profile_image}
        alt={author.name}
        width="80"
        height="80"
      />
      <h3>{author.name}</h3>
      <div>56 Followers</div>
      <p>{about}</p>
    </aside>
  )
}

export default AuthorDetails

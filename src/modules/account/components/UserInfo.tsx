import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/UserInfo.module.scss'
import { formatDate } from '@utils/formatDate'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { updateAccount } from '@store/account'
import { authSelector } from '@store/auth'

const About = () => {
  const { user } = useAppSelector(authSelector)
  const dispatch = useAppDispatch()
  const [imgSrc, setImgSrc] = useState('/assets/auth/user.png')
  const [bio, setBio] = useState('')

  useEffect(() => {
    if (user?.profileImageLink) setImgSrc(user.profileImageLink)
    if (user?.bio) setBio(user.bio)
  }, [user])

  const onSaveBio = () => dispatch(updateAccount({ bio }))

  return (
    <div className={styles.userInfoContainer}>
      <Image
        className={styles.userImage}
        src={imgSrc}
        width="150"
        height="150"
        onError={() => setImgSrc('/assets/auth/user.png')}
      />
      <h1 className={styles.userName}>
        {user?.firstName} {user?.lastName}
      </h1>
      <div className={styles.userEmail}> {user?.email}</div>
      <div className={styles.joinedAt}>
        {user && formatDate(user?.createdAt)}
      </div>
      <br />
      <div className={styles.label}>Biography</div>
      <textarea
        className={styles.bio}
        placeholder="Tell us about yourself"
        onChange={(event: React.FormEvent<HTMLTextAreaElement>) =>
          setBio(event.currentTarget.value)
        }
        value={bio}
      />
      <button
        className={styles.saveBtn}
        onClick={onSaveBio}
        disabled={user?.bio == bio || !bio}
      >
        Save
      </button>
    </div>
  )
}
export default About

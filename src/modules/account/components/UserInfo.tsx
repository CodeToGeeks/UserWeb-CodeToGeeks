import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/UserInfo.module.scss'
import { formatDate } from '@utils/formatDate'
import { useAppSelector } from '@store/hooks'
import { authSelector } from '@store/auth'
import EditProfileForm from './EditProfileForm'

const UserInfo = () => {
  const { user } = useAppSelector(authSelector)
  const [imgSrc, setImgSrc] = useState('/assets/auth/user.png')
  const [isEditClicked, setIsEditClicked] = useState(false)

  useEffect(() => {
    if (user?.profileImageLink) setImgSrc(user.profileImageLink)
  }, [user])

  return (
    <div className={styles.userInfoContainer}>
      <Image
        className={styles.userImage}
        src={imgSrc}
        width="200"
        height="200"
        onError={() => setImgSrc('/assets/auth/user.png')}
      />
      {!isEditClicked ? (
        <>
          <h1 className={styles.userName}>
            {user?.firstName} {user?.lastName}
          </h1>
          <div className={styles.bio}>{user?.bio}</div>
          <button
            className={styles.editBtn}
            onClick={() => setIsEditClicked(true)}
          >
            Edit Profile
          </button>
          <div className={styles.userEmail}> {user?.email}</div>
          <div className={styles.joinedAt}>
            {user && 'Joined at ' + formatDate(user?.createdAt)}
          </div>
          <div className={styles.job}>{user?.jobTitle}</div>
          <div className={styles.location}>
            {user?.country}, {user?.city}
          </div>
        </>
      ) : (
        <EditProfileForm setIsEditClicked={setIsEditClicked} />
      )}
    </div>
  )
}
export default UserInfo

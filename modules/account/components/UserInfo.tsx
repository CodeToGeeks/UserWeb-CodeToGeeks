import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/UserInfo.module.scss'
import { formatDate } from '@utils/formatDate'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authSelector } from '@store/auth'
import { changeProfileImage, accountSelector } from '@store/account'
import EditProfileForm from './EditProfileForm'
import Spinner from '@components/ui/Spinner'
const UserInfo = () => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(authSelector)
  const { isUploadingImage } = useAppSelector(accountSelector)
  const [imgSrc, setImgSrc] = useState('/assets/auth/user.png')
  const [isEditClicked, setIsEditClicked] = useState(false)
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (user?.profileImageLink) setImgSrc(user.profileImageLink)

    if (user?.country && user?.city) setAddress(`${user.country}, ${user.city}`)
    else if (user?.country || user?.city)
      // handling the ','
      setAddress(`${user.country} ${user.city}`)
  }, [user])

  const onUploadHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const imageFile = event.currentTarget.files && event.currentTarget.files[0]
    if (imageFile) dispatch(changeProfileImage(imageFile))
  }

  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.imageWrap}>
        <Image
          className={styles.userImage}
          src={imgSrc}
          width="200"
          height="200"
          onError={() => setImgSrc('/assets/auth/user.png')}
          priority
          objectFit="cover"
        />
        {isUploadingImage && (
          <span className={styles.spinnerWrapper}>
            <Spinner />
          </span>
        )}
        <label htmlFor="img" className={styles.imageUpload}>
          <span>Change Image</span>
        </label>
        <input
          type={'file'}
          id="img"
          name="img"
          accept="image/*"
          onChange={onUploadHandler}
        />
      </div>
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
          {user?.jobTitle && <div className={styles.job}>{user?.jobTitle}</div>}
          {address && <div className={styles.location}>{address}</div>}
        </>
      ) : (
        <EditProfileForm setIsEditClicked={setIsEditClicked} />
      )}
    </div>
  )
}
export default UserInfo

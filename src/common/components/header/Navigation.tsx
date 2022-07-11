import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from './Navigation.module.scss'
import Login from '@modules/auth/components/Login'
import SignUp from '@modules/auth/components/SignUp'
import DropDown from '@components/ui/DropDown'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authSelector, signOut } from '@store/auth'

import { openLoginModal, openSignUpModal, uiSelector } from '@store/ui'

const Navigation = () => {
  const dispatch = useAppDispatch()
  const { user, token } = useAppSelector(authSelector)
  const { isLoginModalOpened, isSignUpModalOpened } = useAppSelector(uiSelector)
  const [imgSrc, setImgSrc] = useState('/assets/auth/user.png')
  const router = useRouter()

  useEffect(() => {
    if (user?.profileImageLink) setImgSrc(user.profileImageLink)
  }, [user])

  const handleOpenLoginModal = () => {
    dispatch(openLoginModal())
  }

  const handleOpenSignUpModal = () => {
    dispatch(openSignUpModal())
  }

  return (
    <>
      <ul className={styles.nav}>
        <li
          className={`${styles.hoverLine} ${
            router.pathname == '/' ? styles.active : ''
          }`}
        >
          <Link href="/">Home</Link>
        </li>
        <li
          className={`${styles.hoverLine} ${
            router.pathname == '/about-us' ? styles.active : ''
          }`}
        >
          <Link href="#">About Us</Link>
        </li>
        {!user || !token ? (
          <>
            <li> | </li>
            <li
              className={`${styles.hoverLine} ${
                isLoginModalOpened ? styles.active : ''
              }`}
            >
              <button onClick={handleOpenLoginModal}>Login</button>
            </li>
            <li>
              <button onClick={handleOpenSignUpModal} className={styles.signUp}>
                Sign Up
              </button>
            </li>
          </>
        ) : (
          <li>
            <DropDown
              btnJSX={
                <button className={styles.userInfo}>
                  <Image
                    src={imgSrc}
                    width="40"
                    height="40"
                    onError={() => setImgSrc('/assets/auth/user.png')}
                  />
                  <span className={styles.userName}>
                    {user.firstName} {user.lastName}
                  </span>
                </button>
              }
              listItems={[
                {
                  label: 'Logout',
                  icon: 'user',
                  onClick: () => dispatch(signOut()),
                },
              ]}
            />
          </li>
        )}
      </ul>
      {isLoginModalOpened && <Login />}
      {isSignUpModalOpened && <SignUp />}
    </>
  )
}

export default Navigation

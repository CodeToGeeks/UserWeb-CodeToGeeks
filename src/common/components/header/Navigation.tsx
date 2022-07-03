import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Navigation.module.scss'
import Login from '@modules/auth/components/Login'
import SignUp from '@modules/auth/components/SignUp'
import DropDown from '@components/ui/DropDown'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  authSelector,
  openLoginModal,
  openSignUpModal,
  autoLogin,
  signOut,
} from '@store/auth'

const Navigation = () => {
  const dispatch = useAppDispatch()
  const { isLoginModalOpened, isSignUpModalOpened, user, token } =
    useAppSelector(authSelector)
  const [imgSrc, setImgSrc] = useState('/assets/auth/user.png')

  useEffect(() => {
    dispatch(autoLogin())
  }, [])

  useEffect(() => {
    if (user) setImgSrc(user.profileImageLink)
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
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="#">About Us</Link>
        </li>
        {!user || !token ? (
          <>
            <li> | </li>
            <li>
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

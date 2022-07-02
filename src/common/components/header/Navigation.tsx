import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Navigation.module.scss'
import Login from '@modules/auth/components/Login'
import SignUp from '@modules/auth/components/SignUp'

import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  authSelector,
  openLoginModal,
  openSignUpModal,
  autoLogin,
} from '@store/auth'

const Navigation = () => {
  const dispatch = useAppDispatch()
  const { isLoginModalOpened, isSignUpModalOpened, user } =
    useAppSelector(authSelector)

  useEffect(() => {
    dispatch(autoLogin())
  }, [])

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
        {!user ? (
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
            <button className={styles.avatar}>
              <Image src={'/assets/auth/user.png'} width="45" height="45" />
            </button>
          </li>
        )}
      </ul>
      {isLoginModalOpened && <Login />}
      {isSignUpModalOpened && <SignUp />}
    </>
  )
}

export default Navigation

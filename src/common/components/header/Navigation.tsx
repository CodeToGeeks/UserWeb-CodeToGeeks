import React from 'react'
import Link from 'next/link'
import styles from './Navigation.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  authSelector,
  openLoginModal,
  openSignUpModal,
  resetModals,
} from '@store/auth'
import Login from '@modules/auth/components/Login'
import SignUp from '@modules/auth/components/SignUp'

const Navigation = () => {
  const dispatch = useAppDispatch()
  const { isLoginModalOpened, isSignUpModalOpened } =
    useAppSelector(authSelector)

  return (
    <>
      <ul className={styles.nav}>
        <li>
          <Link href="#">Home</Link>
        </li>
        <li>
          <Link href="#">About Us</Link>
        </li>
        <li> | </li>
        <li>
          <button onClick={() => dispatch(openLoginModal())}>Login</button>
        </li>
        <li>
          <button
            onClick={() => dispatch(openSignUpModal())}
            className={styles.signUp}
          >
            Sign Up
          </button>
        </li>
      </ul>
      {isLoginModalOpened && (
        <Login
          onCloseHandler={() => {
            dispatch(resetModals())
            console.log('aja')
          }}
        />
      )}
      {isSignUpModalOpened && (
        <SignUp
          onCloseHandler={() => {
            dispatch(resetModals())
            console.log('aja')
          }}
        />
      )}
    </>
  )
}

export default Navigation

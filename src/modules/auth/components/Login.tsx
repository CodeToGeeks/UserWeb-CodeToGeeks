import React from 'react'
import { useRef } from 'react'
import Modal from '@components/ui/Modal'
import styles from '../styles/_.module.scss'

import { useAppDispatch } from '@store/hooks'
import { login, openSignUpModal, resetModals } from '@store/auth'

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(document.createElement('input'))
  const passwordRef = useRef<HTMLInputElement>(document.createElement('input'))
  const dispatch = useAppDispatch()

  const onLoginHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const email = emailRef.current.value
    const password = passwordRef.current.value
    dispatch(
      login({
        email,
        password,
      }),
    )
  }

  const onForgetPasswordHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
  }

  return (
    <Modal
      onCloseHandler={() => dispatch(resetModals())}
      containerStyles={styles.modal}
    >
      <>
        <form className={styles.form}>
          <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type={'email'}
              ref={emailRef}
              autoComplete="off"
              placeholder="Enter your email"
              value=""
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type={'password'}
              ref={passwordRef}
              autoComplete="new-password"
              placeholder="Enter your password"
              value=""
            />
          </div>
          <button
            className={styles.forgetPassword}
            onClick={onForgetPasswordHandler}
          >
            Forgot your Password?
          </button>
          <button className={styles.login} onClick={onLoginHandler}>
            Login
          </button>
          <div className={styles.signUpContainer}>
            <span> Do not Have an account? </span>
            <button onClick={() => dispatch(openSignUpModal())}>sign up</button>
          </div>
        </form>
      </>
    </Modal>
  )
}

export default Login

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Modal from '@components/ui/Modal'
import Spinner from '@components/ui/Spinner'
import CustomInput from './CustomInput'
import styles from '../styles/Login&SignUp.module.scss'

import { useAppDispatch, useAppSelector } from '@store/hooks'
import { login, authSelector } from '@store/auth'
import { openSignUpModal, resetModals } from '@store/ui'

const Login = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isValidForm, setIsValidForm] = useState(false)
  const { isLoading } = useAppSelector(authSelector)

  useEffect(() => {
    // Todo: Add more validations
    setIsValidForm(email != '' && password != '')
  }, [email, password])

  const onLoginHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    dispatch(
      login({
        email,
        password,
      }),
    )
  }

  const onForgetPasswordHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    dispatch(resetModals())
    router.push('/auth/forget-password')
  }

  return (
    <Modal
      onCloseHandler={() => dispatch(resetModals())}
      containerStyles={styles.modal}
    >
      <>
        <div className="d-flex">
          <h1 className="title-underline">Welcome Back!</h1>
        </div>
        <form className={styles.form}>
          <CustomInput
            id="email"
            type={'email'}
            label={'Email'}
            autoComplete="off"
            placeholder="Enter your email"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setEmail(e.currentTarget.value)
            }
            value={email}
          />
          <CustomInput
            id="password"
            type={'password'}
            label={'Password'}
            autoComplete="new-password"
            placeholder="Enter your password"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
            value={password}
          />
          <button
            className={styles.forgetPassword}
            onClick={onForgetPasswordHandler}
          >
            Forgot your Password?
          </button>
          <button
            className={`${styles.login} ${isLoading ? styles.btnDisabled : ''}`}
            onClick={onLoginHandler}
            disabled={isLoading || !isValidForm}
          >
            {isLoading ? <Spinner /> : `Login`}
          </button>
          <div className={styles.signUpContainer}>
            <span> Do not Have an account? </span>
            <button onClick={() => dispatch(openSignUpModal())}>
              Create Account
            </button>
          </div>
        </form>
      </>
    </Modal>
  )
}

export default Login

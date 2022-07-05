import React, { useState, useEffect } from 'react'
import Modal from '@components/ui/Modal'
import Spinner from '@components/ui/Spinner'
import PasswordValidations from './PasswordValidation'
import styles from '../styles/Login&SignUp.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { signUp, openLoginModal, resetModals, authSelector } from '@store/auth'

const Login = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(authSelector)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const [isValidForm, setIsValidForm] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

  useEffect(() => {
    // TODO: Add more validations
    setIsValidForm(
      firstName.trim() != '' &&
        lastName.trim() != '' &&
        email.trim() != '' &&
        isPasswordValid,
    )
  }, [firstName, lastName, email, isPasswordValid])

  const onSignUpHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    dispatch(
      signUp({
        firstName,
        lastName,
        email,
        password,
      }),
    )
  }

  return (
    <Modal
      onCloseHandler={() => dispatch(resetModals())}
      containerStyles={styles.modal}
    >
      <>
        <form className={styles.form}>
          <div className={`${styles.formControl} ${styles.namesContainer}`}>
            <div>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setFirstName(e.currentTarget.value)
                }
                autoComplete="off"
                placeholder="Enter your first name"
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                onChange={(e: React.FormEvent<HTMLInputElement>) =>
                  setLastName(e.currentTarget.value)
                }
                autoComplete="off"
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className={styles.formControl}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setEmail(e.currentTarget.value)
              }
              autoComplete="off"
              placeholder="Enter your email"
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setPassword(e.currentTarget.value)
              }
              autoComplete="new-password"
              placeholder="Enter your password"
              onFocus={() => setIsPasswordFocused(true)}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="password">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setConfirmPassword(e.currentTarget.value)
              }
              autoComplete="new-password"
              placeholder="Enter your confirm password"
            />
          </div>
          {isPasswordFocused && (
            <PasswordValidations
              password={password}
              confirmPassword={confirmPassword}
              setIsPasswordValid={setIsPasswordValid}
            />
          )}

          <button
            className={`${styles.login} ${
              isPasswordValid ? '' : styles.btnDisabled
            }`}
            onClick={onSignUpHandler}
            disabled={!isValidForm || isLoading}
          >
            {isLoading ? <Spinner /> : `SignUp`}
          </button>
          <div className={styles.signUpContainer}>
            <span> Do you have an account? </span>
            <button onClick={() => dispatch(openLoginModal())}> Login </button>
          </div>
        </form>
      </>
    </Modal>
  )
}

export default Login

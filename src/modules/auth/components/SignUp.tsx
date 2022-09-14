import React, { useState, useEffect } from 'react'
import Modal from '@components/ui/Modal'
import Spinner from '@components/ui/Spinner'
import CustomInput from '@components/CustomInput/CustomInput'
import PasswordInput from './PasswordInput'
import PasswordValidations from './PasswordValidation'
import GoogleLogin from './GoogleLogin'
import styles from '../styles/Login&SignUp.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { signUp, authSelector } from '@store/auth'
import { openLoginModal, resetModals } from '@store/ui'

const SignUp = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector(authSelector)

  const [firstLoad, setFirstLoad] = useState(true)
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
            <CustomInput
              id="firstName"
              type="text"
              label={'First Name'}
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                if (firstLoad) setFirstLoad(false)
                setFirstName(e.currentTarget.value)
              }}
              autoComplete="off"
              placeholder="Enter your first name"
              value={firstName}
            />
            <CustomInput
              id="lastName"
              type="text"
              label="Last Name"
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                if (firstLoad) setFirstLoad(false)

                setLastName(e.currentTarget.value)
              }}
              autoComplete="off"
              placeholder="Enter your last name"
              value={lastName}
            />
          </div>
          <CustomInput
            label="Email"
            id="email"
            type="email"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              if (firstLoad) setFirstLoad(false)
              setEmail(e.currentTarget.value)
            }}
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
          />

          <PasswordInput
            id="password"
            label="Password"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              if (firstLoad) setFirstLoad(false)
              setPassword(e.currentTarget.value)
            }}
            autoComplete="new-password"
            placeholder="Enter your password"
            onFocus={() => setIsPasswordFocused(true)}
            value={password}
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            onChange={(e: React.FormEvent<HTMLInputElement>) => {
              if (firstLoad) setFirstLoad(false)
              setConfirmPassword(e.currentTarget.value)
            }}
            autoComplete="new-password"
            placeholder="Enter your confirm password"
            value={confirmPassword}
          />

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
            {isLoading ? <Spinner /> : `Sign Up`}
          </button>
          <GoogleLogin firstLoad={firstLoad} />
          <div className={styles.signUpContainer}>
            <span> Do you have an account? </span>
            <button onClick={() => dispatch(openLoginModal())}> Login </button>
          </div>
        </form>
      </>
    </Modal>
  )
}

export default SignUp

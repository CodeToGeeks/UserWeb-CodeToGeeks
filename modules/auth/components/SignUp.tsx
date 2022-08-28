import React, { useState, useEffect } from 'react'
import Modal from '@components/ui/Modal'
import Spinner from '@components/ui/Spinner'
import CustomInput from '@components/CustomInput/CustomInput'
import PasswordValidations from './PasswordValidation'
import styles from '../styles/Login&SignUp.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { signUp, authSelector } from '@store/auth'
import { openLoginModal, resetModals } from '@store/ui'

const SignUp = () => {
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
            <CustomInput
              id="firstName"
              type="text"
              label={'First Name'}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setFirstName(e.currentTarget.value)
              }
              autoComplete="off"
              placeholder="Enter your first name"
              value={firstName}
            />
            <CustomInput
              id="lastName"
              type="text"
              label="Last Name"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setLastName(e.currentTarget.value)
              }
              autoComplete="off"
              placeholder="Enter your last name"
              value={lastName}
            />
          </div>
          <CustomInput
            label="Email"
            id="email"
            type="email"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setEmail(e.currentTarget.value)
            }
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
          />
          <CustomInput
            id="password"
            type="password"
            label="Password"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
            autoComplete="new-password"
            placeholder="Enter your password"
            onFocus={() => setIsPasswordFocused(true)}
            value={password}
          />
          <CustomInput
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setConfirmPassword(e.currentTarget.value)
            }
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
            {isLoading ? <Spinner /> : `Create Account`}
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

export default SignUp

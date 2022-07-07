import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/ResetPassword.module.scss'
import Card from '@components/ui/Card'
import CustomInput from '../components/CustomInput'
import PasswordValidations from '../components/PasswordValidation'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { resetPassword, openLoginModal, authSelector } from '@store/auth'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoading, verificationCode, isResetPasswordSuccess } =
    useAppSelector(authSelector)

  useEffect(() => {
    if (!password.trim() || !confirmPassword.trim()) {
      return setIsValid(false)
    }
    setIsValid(true)
  }, [password, confirmPassword])
  useEffect(() => {
    if (isResetPasswordSuccess) {
      router.push('/')
      dispatch(openLoginModal())
    }
  }, [isResetPasswordSuccess])

  const onResetPasswordHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    dispatch(resetPassword({ code: verificationCode, password }))
  }

  return (
    <Card>
      <>
        <div className={styles.header}>
          <h1> Reset Password </h1>
        </div>

        <form className={styles.form}>
          <CustomInput
            label="Password"
            id="password"
            type={'password'}
            placeholder="Enter your password"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setPassword(e.currentTarget.value)
            }
            onFocus={() => setIsInputFocused(true)}
            value={password}
          />
          <CustomInput
            label="Confirm Password"
            id="confirmPassword"
            type={'password'}
            placeholder="Confirm your password"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setConfirmPassword(e.currentTarget.value)
            }
            onFocus={() => setIsInputFocused(true)}
            value={confirmPassword}
          />
          {isInputFocused && (
            <PasswordValidations
              password={password}
              confirmPassword={confirmPassword}
              setIsPasswordValid={setIsValid}
            />
          )}
          <button
            className={styles.btn}
            onClick={onResetPasswordHandler}
            disabled={isLoading || !isValid}
          >
            Reset
          </button>
        </form>
      </>
    </Card>
  )
}

export default ResetPassword

import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/VerificationCode.module.scss'
import Spinner from '@components/ui/Spinner'
import Card from '@components/ui/Card'
import SEO from '@components/SEO/SEO'

import OtpInput from 'react-otp-input'

import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  checkVerificationCode,
  sendVerificationCode,
  setVerificationCode,
  authSelector,
} from '@store/auth'

const VerificationCode = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {
    isCorrectVerificationCode,
    isLoading,
    verificationCode,
    forgetPasswordEmail,
  } = useAppSelector(authSelector)

  useEffect(() => {
    if (isCorrectVerificationCode) router.push('/auth/reset-password')
  }, [isCorrectVerificationCode])

  const onCheckCodeHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    dispatch(checkVerificationCode({ code: verificationCode }))
  }

  const onResendCodeHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    dispatch(sendVerificationCode({ email: forgetPasswordEmail }))
  }

  return (
    <Card>
      <>
        <SEO title="Verification Code | Code To Geeks" />
        <div className={styles.header}>
          <div>
            <h1 className="title-underline"> Verification Code </h1>
            <p>Please enter the Verification code sent to your email.</p>
          </div>
          <Image
            src={'/assets/auth/password-forget.png'}
            width="160"
            height="150"
            alt="password-lock"
          />
        </div>

        <form className={styles.form}>
          <div className={styles.formControl}>
            <OtpInput
              value={verificationCode}
              onChange={(otp: string) => dispatch(setVerificationCode(otp))}
              numInputs={4}
              shouldAutoFocus
              inputStyle={styles.input}
            />
          </div>
          <div className={styles.btnContainer}>
            <div className={styles.resend}>
              <span>
                It may take a minute to receive your code
                <br />
                haven&apos;t received it?
              </span>
              <button
                className={styles.resendBtn}
                onClick={onResendCodeHandler}
                disabled={isLoading}
              >
                Resend a new Code
              </button>
            </div>
            <div>
              <button
                className={styles.verify}
                onClick={onCheckCodeHandler}
                disabled={isLoading || verificationCode.trim().length !== 4}
              >
                {isLoading ? <Spinner /> : `Verify`}
              </button>
            </div>
          </div>
        </form>
      </>
    </Card>
  )
}

export default VerificationCode

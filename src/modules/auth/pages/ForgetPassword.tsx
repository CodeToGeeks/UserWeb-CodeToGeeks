import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/ForgetPassword.module.scss'
import Spinner from '@components/ui/Spinner'
import Card from '@components/ui/Card'
import CustomInput from '@components/CustomInput/CustomInput'

import { useAppDispatch, useAppSelector } from '@store/hooks'
import {
  sendVerificationCode,
  setForgetPasswordEmail,
  authSelector,
} from '@store/auth'

export default function Home() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isVerificationCodeSent, forgetPasswordEmail, isLoading } =
    useAppSelector(authSelector)

  useEffect(() => {
    if (isVerificationCodeSent) router.push('/auth/verification-code')
  }, [isVerificationCodeSent])

  const onSendVerificationCodeHandler = (
    event: React.MouseEvent<HTMLElement>,
  ) => {
    event.preventDefault()
    dispatch(sendVerificationCode({ email: forgetPasswordEmail }))
  }

  return (
    <Card>
      <>
        <h1 className={`title-underline ${styles.title}`}>
          Forget your password?
        </h1>
        <div className={styles.textImageContainer}>
          <p>
            Please enter the email address you&apos;d like your
            <br />
            password information sent to.
          </p>
          <Image src={'/assets/auth/letter.png'} width="100" height="100" />
        </div>
        <form className={styles.form}>
          <CustomInput
            id="email"
            type={'email'}
            label={'Enter your email'}
            placeholder="Enter your email"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              dispatch(setForgetPasswordEmail(e.currentTarget.value))
            }
            value={forgetPasswordEmail}
          />
          <div className={styles.btnContainer}>
            <button
              onClick={onSendVerificationCodeHandler}
              disabled={isLoading || forgetPasswordEmail.trim() == ''}
            >
              {isLoading ? <Spinner /> : `Send code`}
            </button>
            <button>Back to login</button>
          </div>
        </form>
      </>
    </Card>
  )
}

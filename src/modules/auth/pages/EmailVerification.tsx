import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Card from '@components/ui/Card'
import styles from '../styles/EmailVerification.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authSelector, VerifyEmail } from '@store/auth'

type EmailVerificationProps = {
  token: string | string[] | undefined
}

// TODO:
//  Add loading state
//  change routing to be after 5 seconds of showing the message

const EmailVerification = ({ token }: EmailVerificationProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { isLoading, emailVerified } = useAppSelector(authSelector)
  const successMessage = 'Your email has been verified successfully.'
  const errorMessage = `Verification failed. Please try again.`
  const successImagePath = '/assets/auth/verified.svg'
  const errorImagePath = '/assets/auth/not-verified.svg'

  useEffect(() => {
    if (typeof token == 'string') dispatch(VerifyEmail({ token }))
  }, [token])

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 5000)
  }, [emailVerified])

  return !isLoading ? (
    <Card>
      <div className={styles.centerContent}>
        <h1 className={styles.title}>
          {emailVerified ? successMessage : errorMessage}
        </h1>

        <Image
          src={emailVerified ? successImagePath : errorImagePath}
          width={'100'}
          height={'100'}
        />
      </div>
    </Card>
  ) : (
    <></>
  )
}

export default EmailVerification

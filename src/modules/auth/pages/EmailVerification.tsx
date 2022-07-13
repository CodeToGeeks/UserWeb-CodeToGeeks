import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Card from '@components/ui/Card'
import styles from '../styles/EmailVerification.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { authSelector, VerifiyEmail } from '@store/auth'

type EmailVerificationProps = {
  token: string | string[] | undefined
}

const EmailVerification = ({ token }: EmailVerificationProps) => {
  const router = useRouter()

  const dispatch = useAppDispatch()

  const { isLoading, emailVerified } = useAppSelector(authSelector)

  useEffect(() => {
    if (typeof token == 'string') dispatch(VerifiyEmail({ token: token }))
  }, [token])

  useEffect(() => {
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }, [emailVerified])

  return (
    <>
      {!isLoading && (
        <Card>
          <>
            <div className={styles.centerContent}>
              <h1 className={styles.title}>
                {emailVerified
                  ? 'Email Verified Successfully'
                  : 'Email Verified faild'}
              </h1>
            </div>

            <div className={styles.textImageContainer}>
              <br />
              <div className={styles.imageContainer}>
                <Image
                  src={
                    emailVerified
                      ? '/assets/auth/verified.png'
                      : '/assets/auth/noVerified.png'
                  }
                  width={'150'}
                  height={'150'}
                />
              </div>
            </div>
          </>
        </Card>
      )}
    </>
  )
}

export default EmailVerification

import { useRef } from 'react'
import useScript from '../hooks/useScript'
import styles from '../styles/Login&SignUp.module.scss'
import { useAppDispatch } from '@store/hooks'
import { googleLogin } from '@store/auth'

declare const google: any
type googleLoginProps = {
  onGoogleSignIn?: (response: any) => void
  text?: string
}

export default function GoogleLogin({
  onGoogleSignIn,
  text = 'signin_with',
}: googleLoginProps) {
  const googleSignInButton = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  onGoogleSignIn = (response: any) => {
    dispatch(googleLogin({ token: response.credential }))
  }

  useScript('https://accounts.google.com/gsi/client', () => {
    google.accounts.id.initialize({
      client_id: process.env.APP_GOOGLE_CLIENT_ID,
      callback: onGoogleSignIn,
    })
    google.accounts.id.renderButton(googleSignInButton.current, {
      theme: 'outline',
      size: 'large',
      width: googleSignInButton?.current?.clientWidth,
      text,
    })
  })

  return <div className={styles.googleLogin} ref={googleSignInButton}></div>
}

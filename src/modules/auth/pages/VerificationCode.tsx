import React from 'react'
import Image from 'next/image'
import styles from './VerificationCode.module.scss'

export default function Home() {
  return (
    <main className={styles.container}>
      <div className="d-flex">
        <div>
          <h1> Verification Code </h1>
          <p>Please enter the Verification code sent to your email.</p>
        </div>
        <Image
          src={'/assets/auth/password-forget.png'}
          width="160"
          height="150"
        />
      </div>

      <form className={styles.form}>
        <div className={styles.formControl}>
          <input />
          <input />
          <input />
          <input />
          <input />
          <input />
        </div>
        <div className={styles.btnContainer}>
          <div className={styles.resend}>
            <span>
              It may take a minute to receive your code
              <br />
              haven&apos;t received it?{'    '}
            </span>
            <button className={styles.resendBtn}>Resend a new Code</button>
          </div>
          <div>
            <button className={styles.verify}>Verify</button>
          </div>
        </div>
      </form>
    </main>
  )
}

import React from 'react'
import Image from 'next/image'
import styles from './ForgetPassword.module.scss'

export default function Home() {
  return (
    <main className={styles.container}>
      <h1> Forget your password? </h1>
      <div className={styles.textImageContainer}>
        <p>
          Please enter the email address you&apos;d like your
          <br />
          password information sent to.
        </p>
        <Image src={'/assets/auth/letter.png'} width="100" height="100" />
      </div>
      <form className={styles.form}>
        <div className={styles.formControl}>
          <label htmlFor="email">Enter Email Address</label>
          <input />
        </div>
        <div className={styles.btnContainer}>
          <button>Send code</button>
          <button>Back to login</button>
        </div>
      </form>
    </main>
  )
}

import React from 'react'
import Link from 'next/link'
import styles from './Navigation.module.scss'

const Navigation = () => {
  return (
    <>
      <ul className={styles.nav}>
        <li>
          <Link href="#">Home</Link>
        </li>
        <li>
          <Link href="#">About Us</Link>
        </li>
        <li> | </li>
        <li>
          <button>Login</button>
        </li>
        <li>
          <button className={styles.signUp}>Sign Up</button>
        </li>
      </ul>
    </>
  )
}

export default Navigation

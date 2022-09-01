import Link from 'next/link'
import React from 'react'
import Logo from '../header/Logo'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <div className={styles.logoContainer}>
          <Logo styles={styles.logo} />
          <div>CodeToGeeks</div>
        </div>
        <div className={styles.contact}>
          <div>Contact</div>
          <a href="mailto:Info@CodeToGeeks.com">Info@CodeToGeeks.com</a>
        </div>
      </div>

      <div className={styles.borderTop}>
        <div>&copy; Code To Geeks 2022</div>
        <ul>
          <li>
            <Link href="/terms">Terms of use</Link>
          </li>
          <li>
            <Link href="/privacy"> Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer

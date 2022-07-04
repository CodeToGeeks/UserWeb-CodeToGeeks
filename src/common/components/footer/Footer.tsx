import Link from 'next/link'
import React from 'react'
import Logo from '../header/Logo'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <Logo styles={styles.logo} />
        <div className={styles.contact}>
          <div>Contact</div>
          <a href="tel:01278759466">(+20) 1278-759-466</a>
        </div>
      </div>

      <div className={styles.borderTop}>
        <div>&copy; Code To Geeks 2022</div>
        <ul>
          <li>
            <Link href="#">Terms of use</Link>
          </li>
          <li>
            <Link href="#"> Privacy Policy</Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer

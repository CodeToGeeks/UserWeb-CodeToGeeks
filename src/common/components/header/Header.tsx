import React from 'react'
import Navigation from './Navigation'
import SearchBar from './SearchBar'
import Logo from './Logo'
import styles from './Header.module.scss'
import MobileMenu from './MobileMenu'

const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.header}>
        <MobileMenu />
        <div>
          <div className={styles.logoContainer}>
            <Logo styles={styles.logo} width="52" height="42" />
            <span>CodeToGeeks</span>
          </div>
          <SearchBar />
        </div>
        <Navigation />
      </div>
    </header>
  )
}

export default Header

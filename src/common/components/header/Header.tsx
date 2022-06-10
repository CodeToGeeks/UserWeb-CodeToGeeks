import React from 'react'
import Navigation from './Navigation'
import SearchBar from './SearchBar'
import Logo from './Logo'
import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.header}>
        <div>
          <Logo styles={styles.logo} width="60" height="42" />
          <SearchBar />
        </div>
        <Navigation />
      </div>
    </header>
  )
}

export default Header

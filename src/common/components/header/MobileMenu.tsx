import React, { useState } from 'react'
import HamburgerMenuBtn from '@components/ui/HamburgerMenuBtn'
import styles from './MobileMenu.module.scss'
import SearchBar from './SearchBar'
import Link from 'next/link'

import { authSelector } from '@store/auth'
import { useAppSelector } from '@store/hooks'

const MobileMenu = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { user } = useAppSelector(authSelector)

  return (
    <nav className={styles.hamburgerMenuContainer}>
      <HamburgerMenuBtn isOpened={isOpened} setIsOpened={setIsOpened} />
      <div className={`${styles.nav} ${isOpened ? styles.opened : null}`}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about-us">About Us</Link>
          </li>
          {user && (
            <li>
              <Link href="/account">Reading List</Link>
            </li>
          )}
          <li>
            <SearchBar />
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default MobileMenu

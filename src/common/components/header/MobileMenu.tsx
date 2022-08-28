import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import HamburgerMenuBtn from '@components/ui/HamburgerMenuBtn'
import styles from './MobileMenu.module.scss'
import SearchBar from './SearchBar'
import Link from 'next/link'

import { authSelector } from '@store/auth'
import { useAppSelector } from '@store/hooks'

const MobileMenu = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { user } = useAppSelector(authSelector)
  const router = useRouter()

  // TODO: fix close modal when navigation to same route/ search
  useEffect(() => {
    router.events.on('routeChangeComplete', () => setIsOpened(false))
    return () =>
      router.events.off('routeChangeComplete', () => setIsOpened(false))
  }, [])

  const onClickOutsideHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target != e.currentTarget) return
    setIsOpened(false)
  }

  return (
    <nav className={styles.hamburgerMenuContainer}>
      <HamburgerMenuBtn isOpened={isOpened} setIsOpened={setIsOpened} />
      <div
        className={`${styles.overlay} ${isOpened ? styles.opened : null}`}
        onClick={onClickOutsideHandler}
      >
        <div className={styles.nav}>
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
      </div>
    </nav>
  )
}

export default MobileMenu

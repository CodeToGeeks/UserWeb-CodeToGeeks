import React, { useState } from 'react'
import { useRouter } from 'next/router'
import HamburgerMenuBtn from '@components/ui/HamburgerMenuBtn'
import styles from './MobileMenu.module.scss'
import SearchBar from './SearchBar'

import { authSelector } from '@store/auth'
import { useAppSelector } from '@store/hooks'

const MobileMenu = () => {
  const [isOpened, setIsOpened] = useState(false)
  const { user } = useAppSelector(authSelector)
  const router = useRouter()

  const onClickOutsideHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target != e.currentTarget) return
    setIsOpened(false)
  }

  const onNavigateHandler = (route: string) => {
    router.push(route)
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
              <button onClick={() => onNavigateHandler('/')}>Home</button>
            </li>
            <li>
              <button onClick={() => onNavigateHandler('/about-us')}>
                About Us
              </button>
            </li>
            {user && (
              <li>
                <button onClick={() => onNavigateHandler('/account')}>
                  Reading List
                </button>
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

import React, { useState } from 'react'
import styles from '../styles/Account.module.scss'

import UserInfo from '@modules/account/components/UserInfo'
import SavedPosts from '../components/SavedPosts'
import { useAppSelector } from '@store/hooks'
import { authSelector } from '@store/auth'

const Account = () => {
  const { user } = useAppSelector(authSelector)
  const [tab, setTab] = useState<'savedPosts' | 'about'>('savedPosts')

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {user?.firstName} {user?.lastName}
      </h1>
      <ul className={styles.nav}>
        <li
          className={`hover-line ${tab === 'savedPosts' ? styles.active : ''}`}
        >
          <button onClick={() => setTab('savedPosts')}>Saved Posts</button>
        </li>
        <li className={`hover-line ${tab === 'about' ? styles.active : ''}`}>
          <button onClick={() => setTab('about')}>About</button>
        </li>
      </ul>
      {tab === 'savedPosts' ? <SavedPosts /> : <UserInfo />}
    </div>
  )
}
export default Account

import React from 'react'
import styles from './styles/index.module.scss'
import UserInfo from '@modules/account/components/UserInfo'
import SavedPosts from './components/SavedPosts'
const Account = () => {
  return (
    <div className={styles.container}>
      <UserInfo />
      <SavedPosts />
    </div>
  )
}
export default Account

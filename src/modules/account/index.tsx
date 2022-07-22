import React from 'react'
import styles from './styles/index.module.scss'
import UserInfo from '@modules/account/components/UserInfo'
import SavedPosts from './components/SavedPosts'
import SEO from '@components/SEO/SEO'

const Account = () => {
  return (
    <>
      <SEO title="Code To Geeks | Account | Reading List" />
      <div className={styles.container}>
        <UserInfo />
        <SavedPosts />
      </div>
    </>
  )
}
export default Account

import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './styles/index.module.scss'
import UserInfo from '@modules/account/components/UserInfo'
import SavedPosts from './components/SavedPosts'
import SEO from '@components/SEO/SEO'
import { useAppSelector } from '@store/hooks'
import { authSelector } from '@store/auth'

const Account = () => {
  const { isAuthenticated } = useAppSelector(authSelector)
  const router = useRouter()
  useEffect(() => {
    // TODO: Fix delay in navigation
    if (!isAuthenticated) router.push('/')
  }, [isAuthenticated])
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

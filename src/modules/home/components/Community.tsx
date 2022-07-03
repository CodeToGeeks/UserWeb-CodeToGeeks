import React from 'react'
import styles from '../styles/Community.module.scss'
import Logo from '@components/header/Logo'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { openLoginModal, openSignUpModal, authSelector } from '@store/auth'

const Community = () => {
  const dispatch = useAppDispatch()
  const { isAuthenticated } = useAppSelector(authSelector)

  return (
    <aside className={styles.card}>
      <h2
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Code
        <br />
        To
        <br />
        Geeks
        <Logo styles={styles.communityLogo} />
      </h2>

      <div> Is the geeks developers community</div>

      <p>
        We are a place where coders share, stay up-to-date and grow their
        careers.
      </p>
      {!isAuthenticated && (
        <>
          <button
            className={styles.signUp}
            onClick={() => dispatch(openSignUpModal())}
          >
            Create account
          </button>
          <button
            className={styles.logIn}
            onClick={() => dispatch(openLoginModal())}
          >
            Log in
          </button>
        </>
      )}
    </aside>
  )
}

export default Community

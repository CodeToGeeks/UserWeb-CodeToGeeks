import React from 'react'
import styles from '../styles/Community.module.scss'

const Community = () => {
  return (
    <aside className={styles.card}>
      <h2>Dev To Geeks Community</h2>
      <div>is a community of 822,969 amazing developers</div>
      <p>
        We are a place where coders share, stay up-to-date and grow their
        careers.
      </p>
      <button className={styles.signUp}>Create account</button>
      <button className={styles.logIn}>Log in </button>
    </aside>
  )
}

export default Community

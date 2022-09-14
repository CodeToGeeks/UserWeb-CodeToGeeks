import React from 'react'
import styles from '../styles/index.module.scss'
import SEO from '@components/SEO/SEO'

const AboutUs = () => {
  return (
    <main className={`${styles.container} ${styles.aboutUs}`}>
      <SEO
        title="About Us | Code To Geeks"
        description="Code To Geeks is a platform for developers to share their knowledge and experience with the world."
      />
      <h1 className="title-underline">Who Where Are?</h1>
      <p>
        We are just a group of software engineers that decided to make a
        platform to share their knowledge and experience with the world.
        <br />
        <br />
        This is the Beta version of our website,
        <br />
        If you have any ideas about how to improve our website or if you face
        any issues with our website, please share them with us.
        <a href="mailto:info@codetogeeks.com"> info@codetogeeks.com</a>
      </p>
    </main>
  )
}

export default AboutUs

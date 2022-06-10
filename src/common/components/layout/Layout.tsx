import React from 'react'
import Footer from '../footer/Footer'
import Header from '../header/Header'
import styles from './Layout.module.scss'

type LayoutProps = {
  children: JSX.Element
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout

import React from 'react'
import styles from './SearchBar.module.scss'

const SearchBar = () => {
  return (
    <div className={styles.searchContainer}>
      <input className={styles.input} placeholder="Search..." type={'search'} />
      <img className={styles.img} src={'/assets/home/search.svg'} />
    </div>
  )
}

export default SearchBar

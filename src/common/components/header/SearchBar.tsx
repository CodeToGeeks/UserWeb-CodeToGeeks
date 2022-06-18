import React from 'react'
import Image from 'next/image'
import styles from './SearchBar.module.scss'

const SearchBar = () => {
  return (
    <div className={styles.searchContainer}>
      <input className={styles.input} placeholder="Search..." type={'search'} />
      <div className={styles.imgContainer}>
        <Image
          src={'/assets/home/search.svg'}
          alt="search icon"
          width={'25'}
          height={'25'}
        />
      </div>
    </div>
  )
}

export default SearchBar

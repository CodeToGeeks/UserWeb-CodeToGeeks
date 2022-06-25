import React, { useCallback } from 'react'
import Image from 'next/image'
import { debounce } from 'lodash'
import styles from './SearchBar.module.scss'

import { setSearchKeyword } from '@store/main'
import { useAppDispatch } from '@store/hooks'

const SearchBar = () => {
  const dispatch = useAppDispatch()
  const onchangeHandler = useCallback(
    debounce(async (keyword) => dispatch(setSearchKeyword(keyword)), 500),
    [],
  )

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        placeholder="Search..."
        type={'search'}
        onChange={(e) => onchangeHandler(e.target.value)}
      />
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

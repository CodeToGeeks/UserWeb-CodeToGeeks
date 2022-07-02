import React from 'react'
import styles from './DropDown.module.scss'
type DropDownProps = {
  listItems: ListItem[]
  btnJSX: JSX.Element
}

type ListItem = {
  label: string
  icon?: string
  onClick?: () => void
}

const DropDown = ({ listItems, btnJSX }: DropDownProps) => {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropBtn}>{btnJSX}</button>
      <div className={styles.dropdownContent}>
        {listItems.map((item, index) => (
          <button key={index} onClick={item.onClick}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default DropDown

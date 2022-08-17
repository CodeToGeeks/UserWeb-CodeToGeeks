import React from 'react'
import styles from './Card.module.scss'
type CardProps = {
  children: JSX.Element
  containerStyles?: string
  style?: object
}
const Card = ({ children, containerStyles, style }: CardProps) => {
  return (
    <div className={`${styles.container} ${containerStyles}`} style={style}>
      {children}
    </div>
  )
}

export default Card

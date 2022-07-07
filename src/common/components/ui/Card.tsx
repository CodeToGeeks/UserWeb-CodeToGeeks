import React from 'react'
import styles from './Card.module.scss'
type CardProps = {
  children: JSX.Element
  containerStyles?: string
}
const Card = ({ children, containerStyles }: CardProps) => {
  return (
    <div className={`${styles.container} ${containerStyles}`}>{children}</div>
  )
}

export default Card

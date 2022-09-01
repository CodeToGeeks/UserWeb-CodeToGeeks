import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'

type ModalProps = {
  children: JSX.Element
  onCloseHandler: () => void
  containerStyles?: string
}

const Modal = ({
  children,
  onCloseHandler,
  containerStyles = ``,
}: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const onClose = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target != e.currentTarget) return
    onCloseHandler && onCloseHandler()
  }
  const ModalContent = (
    <div onClick={onClose} className={styles.modal}>
      <div className={`${styles.modalContent} ${containerStyles}`}>
        <button onClick={onClose} className={styles.close}>
          &times;
        </button>
        {children}
      </div>
    </div>
  )

  const ModalElement = document.getElementById('modal')
  if (isBrowser && ModalElement) {
    return ReactDOM.createPortal(ModalContent, ModalElement)
  } else {
    return null
  }
}

export default Modal

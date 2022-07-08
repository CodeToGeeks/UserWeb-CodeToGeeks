import React, { useState, useEffect } from 'react'
// import Image from 'next/image'
import styles from './Toast.module.scss'
import { ToastType } from '@constants/toastType'
import ReactDOM from 'react-dom'

import { useAppDispatch, useAppSelector } from '@store/hooks'
import { removeToast, uiSelector } from '@store/ui'

const imagePath: {
  [key in ToastType]: string
} = {
  success: '/assets/toast/success.svg',
  error: '/assets/toast/error.svg',
  warning: '/assets/toast/warning.svg',
  info: '/assets/toast/warning.svg',
}

const ToastColor: {
  [key in ToastType]: string
} = {
  success: '#a7ffc4',
  error: '#ffb1b5',
  warning: '#f9eac6',
  info: '#aee8f6',
}

const Toast = () => {
  const [isBrowser, setIsBrowser] = useState(false)
  const dispatch = useAppDispatch()
  const { toasts } = useAppSelector(uiSelector)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (toasts.length) dispatch(removeToast(toasts[0].id))
    }, 5000)

    return () => clearInterval(interval)
  }, [toasts])

  const deleteToast = (id: string) => {
    dispatch(removeToast(id))
  }

  const ToastContent = (
    <div className={`${styles.notificationContainer} ${styles.topRight}`}>
      {toasts.map((toast, i) => (
        <div
          key={i}
          className={`${styles.notification} ${styles.toast} ${styles.topRight}`}
          style={{ backgroundColor: ToastColor[toast.type] }}
        >
          <div className="d-flex">
            <div className={styles.image}>
              <img src={imagePath[toast.type]} alt="" />
            </div>
            <div>
              <p className={styles.title}>{toast.type}</p>
              <p className={styles.message}>{toast.message}</p>
            </div>
          </div>
          <button
            className={styles.close}
            onClick={() => deleteToast(toast.id)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  )
  let toastElement
  if (isBrowser) toastElement = document.getElementById('modal')
  if (isBrowser && toastElement) {
    return ReactDOM.createPortal(ToastContent, toastElement)
  } else {
    return null
  }
}

export default Toast

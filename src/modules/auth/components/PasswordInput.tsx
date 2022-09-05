import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import CustomInput from '@components/CustomInput/CustomInput'
import styles from '../styles/PasswordInput.module.scss'

type PasswordInputProps = {
  id: string
  label: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void

  autoComplete?: string
  placeholder: string
  onFocus?: (e?: React.FormEvent<HTMLInputElement>) => void
  value: string
}

const PasswordInput = ({
  id,
  label,
  onChange,
  autoComplete,
  placeholder,
  onFocus,
  value,
}: PasswordInputProps) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const [shownImagePath, setShownImagePath] = useState('/assets/auth/eye.svg')
  useEffect(() => {
    isPasswordShown
      ? setShownImagePath('/assets/auth/eye-crossed.svg')
      : setShownImagePath('/assets/auth/eye.svg')
  }, [isPasswordShown])

  return (
    <div className={styles.container}>
      <CustomInput
        id={id}
        type={isPasswordShown ? 'text' : 'password'}
        label={label}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onFocus={onFocus}
      />
      <button
        className={styles.eye}
        onClick={(e) => {
          e.preventDefault()
          setIsPasswordShown(!isPasswordShown)
        }}
      >
        <Image src={shownImagePath} width="20" height="20" />
      </button>
    </div>
  )
}

export default PasswordInput

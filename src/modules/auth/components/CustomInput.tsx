import React from 'react'
import styles from '../styles/CustomInput.module.scss'

type CustomInputProps = {
  id: string
  type: string
  placeholder: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  value: string
  autoComplete?: string
  disabled?: boolean
  onFocus?: () => void
  onBlur?: () => void
  label?: string
  labelClassName?: string
}

const CustomInput = ({
  id,
  type,
  placeholder,
  onChange,
  value,
  autoComplete,
  disabled,
  onFocus,
  onBlur,
  label,
  labelClassName,
}: CustomInputProps) => {
  return (
    <div className={styles.formControl}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        name={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={disabled ? styles.invalid : styles.valid}
        autoComplete={autoComplete}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </div>
  )
}

export default CustomInput

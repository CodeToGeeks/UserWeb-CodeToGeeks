import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '../styles/Login&SignUp.module.scss'

type PasswordValidationsProps = {
  password: string
  confirmPassword: string
  setIsPasswordValid: (isValid: boolean) => void
}

const PasswordValidations = ({
  password,
  confirmPassword,
  setIsPasswordValid,
}: PasswordValidationsProps) => {
  const [isHaveLetter, setIsHaveLetter] = useState(false)
  const [isHaveNumber, setIsHaveNumber] = useState(false)
  const [isHave8Letters, setIsHave8Letters] = useState(false)
  const [shouldMatchConfirmPassword, setShouldMatchConfirmPassword] =
    useState(false)

  useEffect(() => {
    setIsHaveLetter(/[A-Za-z]/.test(password))
    setIsHaveNumber(/\d/.test(password))
    setIsHave8Letters(/(?=.{8,})/.test(password))
    setShouldMatchConfirmPassword(
      password === confirmPassword && password != '',
    )
  }, [password, confirmPassword])

  useEffect(() => {
    setIsPasswordValid(
      isHaveLetter &&
        isHaveNumber &&
        isHave8Letters &&
        shouldMatchConfirmPassword,
    )
  }, [isHaveLetter, isHaveNumber, isHave8Letters, shouldMatchConfirmPassword])

  return (
    <section className={styles.passwordValidationsContainer}>
      <div>
        <div>
          At least 8 Characters
          <>{renderIcon(isHave8Letters)}</>
        </div>

        <div>
          At least 1 number
          <>{renderIcon(isHaveNumber)}</>
        </div>
      </div>
      <div>
        <div>
          At least 1 letter
          <>{renderIcon(isHaveLetter)}</>
        </div>
        <div>
          Match confirm password
          <>{renderIcon(shouldMatchConfirmPassword)}</>
        </div>
      </div>
    </section>
  )
}

const doneIcon = <Image src={'/assets/auth/done.svg'} width="24" height="24" />
const wrongIcon = (
  <Image src={'/assets/auth/close.svg'} width="24" height="24" />
)
const renderIcon = (isDone: boolean) => (isDone ? doneIcon : wrongIcon)

export default PasswordValidations

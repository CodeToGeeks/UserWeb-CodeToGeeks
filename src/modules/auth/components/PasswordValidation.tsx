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
  const [isHave8Characters, setIsHave8Characters] = useState(false)
  const [shouldMatchConfirmPass, setShouldMatchConfirmPass] = useState(false)

  useEffect(() => {
    setIsHaveLetter(/[A-Za-z]/.test(password))
    setIsHaveNumber(/\d/.test(password))
    setIsHave8Characters(/(?=.{8,})/.test(password))
    setShouldMatchConfirmPass(password === confirmPassword && password != '')
  }, [password, confirmPassword])

  useEffect(() => {
    setIsPasswordValid(
      isHaveLetter &&
        isHaveNumber &&
        isHave8Characters &&
        shouldMatchConfirmPass,
    )
  }, [isHave8Characters, isHaveLetter, isHaveNumber, shouldMatchConfirmPass])

  return (
    <section className={styles.passwordValidationsContainer}>
      <div>
        <div>
          At least 8 Characters
          <>{renderIcon(isHave8Characters)}</>
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
          <>{renderIcon(shouldMatchConfirmPass)}</>
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

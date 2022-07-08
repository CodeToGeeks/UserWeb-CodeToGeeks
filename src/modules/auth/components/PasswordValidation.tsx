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
  const [isHaveUpperCase, setIsHaveUpperCase] = useState(false)
  const [isHaveLowerCase, setIsHaveLowerCase] = useState(false)
  const [isHaveNumber, setIsHaveNumber] = useState(false)
  const [isHaveSpecialChar, setIsHaveSpecialChar] = useState(false)
  const [isHave8Letters, setIsHave8Letters] = useState(false)
  const [shouldMatchPassConfirmPassword, setShouldMatchPassConfirmPassword] =
    useState(false)

  useEffect(() => {
    setIsHaveUpperCase(/(?=.*[A-Z])/.test(password))
    setIsHaveLowerCase(/(?=.*[a-z])/.test(password))
    setIsHaveNumber(/\d/.test(password))
    setIsHaveSpecialChar(/(?=.*[!@#$%^&*])/.test(password))
    setIsHave8Letters(/(?=.{8,})/.test(password))
    setShouldMatchPassConfirmPassword(
      password === confirmPassword && password != '',
    )

    setIsPasswordValid(
      isHaveUpperCase &&
        isHaveLowerCase &&
        isHaveNumber &&
        isHaveSpecialChar &&
        isHave8Letters &&
        shouldMatchPassConfirmPassword,
    )
  }, [password, confirmPassword])

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
          At least 1 lower case letter
          <>{renderIcon(isHaveLowerCase)}</>
        </div>
        <div>
          At least 1 upper case letter
          {renderIcon(isHaveUpperCase)}
        </div>
      </div>
      <div>
        <div>
          At least 1 special character
          <>{renderIcon(isHaveSpecialChar)}</>
        </div>
        <div>
          Match confirm password
          <>{renderIcon(shouldMatchPassConfirmPassword)}</>
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

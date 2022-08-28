import React, { useEffect, useState } from 'react'
import styles from '../styles/EditProfileForm.module.scss'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { updateAccount, accountSelector } from '@store/account'
import { authSelector } from '@store/auth'
import CustomInput from '@components/CustomInput/CustomInput'
import Spinner from '@components/ui/Spinner'
type EditProfileFormProps = {
  setIsEditClicked: (isValid: boolean) => void
}

/* Todo:
  - Add validation for form
  - Add warning message for form if not valid
  - Add loading spinner while saving
  - Enhance styles
*/

const EditProfileForm = ({ setIsEditClicked }: EditProfileFormProps) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(authSelector)
  const { isUpdateAccountLoading } = useAppSelector(accountSelector)
  const [isValidForm, setIsValidForm] = useState(false)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    jobTitle: '',
    bio: '',
  })

  useEffect(() => {
    if (!user) return
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      city: user.city,
      jobTitle: user.jobTitle,
      bio: user.bio,
    })
  }, [user])

  useEffect(() => {
    // the 2 required fields are filled
    const isValid = form.firstName.trim() != '' && form.lastName.trim() != ''
    // Check if there is any change in the form
    const isChanged = Object.entries(form).some(
      ([key, value]) => user && user[key] != value,
    )
    setIsValidForm(isValid && isChanged)
  }, [form])

  const onUpdateProfileHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    dispatch(updateAccount(form))
    setIsEditClicked(false)
  }

  const onUpdateForm = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    setForm({ ...form, [name]: value })
  }
  const onUpdateBio = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.currentTarget
    setForm({ ...form, [name]: value })
  }

  return (
    <form className={styles.form}>
      <label> Name </label>
      <div className={styles.formControl}>
        <CustomInput
          id="firstName"
          placeholder="Enter you first name"
          value={form.firstName}
          type="text"
          onChange={onUpdateForm}
        />
        <CustomInput
          id="lastName"
          placeholder="Enter you last name"
          value={form.lastName}
          type="text"
          onChange={onUpdateForm}
        />
      </div>
      <label> Bio </label>
      <textarea
        id="bio"
        name="bio"
        className={styles.bio}
        cols={12}
        placeholder="Tell us about yourself"
        onChange={onUpdateBio}
        value={form.bio}
        minLength={200}
      />
      <div className={styles.job}>
        <CustomInput
          id="jobTitle"
          type="text"
          placeholder="Enter your job title"
          value={form.jobTitle}
          onChange={onUpdateForm}
        />
      </div>
      <div className={`${styles.location} ${styles.formControl}`}>
        <CustomInput
          type="text"
          id="country"
          placeholder="Enter your country"
          value={form.country}
          onChange={onUpdateForm}
        />
        <CustomInput
          type="text"
          id="city"
          placeholder="Enter your city"
          value={form.city}
          onChange={onUpdateForm}
        />
      </div>

      <div className={styles.btnContainer}>
        <button
          className={styles.cancelBtn}
          onClick={() => setIsEditClicked(false)}
        >
          Cancel
        </button>
        <button
          disabled={!isValidForm}
          className={styles.saveBtn}
          onClick={onUpdateProfileHandler}
        >
          {isUpdateAccountLoading ? <Spinner /> : 'Save'}
        </button>
      </div>
    </form>
  )
}
export default EditProfileForm

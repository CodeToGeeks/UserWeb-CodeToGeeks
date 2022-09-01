import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { autoLogin, authSelector } from '@store/auth'
import { axiosConfig } from '@utils/axiosConfig'

type AuthProviderProps = {
  children: JSX.Element
}
const AuthProvider = ({ children }: AuthProviderProps) => {
  const dispatch = useAppDispatch()
  const { token } = useAppSelector(authSelector)

  useEffect(() => {
    axiosConfig()
  }, [token])

  useEffect(() => {
    dispatch(autoLogin())
  }, [])

  return <>{children}</>
}

export default AuthProvider

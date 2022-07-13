import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  LoginPayload,
  SignUpPayload,
  SendVerificationCodePayload,
  CheckVerificationCodePayload,
  ResetPasswordPayload,
} from './models'
import { showToastError, showToastSuccess, resetModals } from '@store/ui'
import { apiErrorHandler } from '@utils/apiErrorHandler'
export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload: SignUpPayload, { dispatch }) => {
    try {
      const res = await axios.post('/auth/signup', payload)
      //TODO: redirect to verification Page
      return res.data
    } catch (error) {
      const errorMessage =
        apiErrorHandler(error as Error | AxiosError) ||
        'Error creating new account'
      dispatch(showToastError(errorMessage))
      throw new Error(errorMessage)
    }
  },
)

export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { dispatch }) => {
    try {
      const res: any = await axios.post('auth/signin', payload)
      // save to local storage
      localStorage.setItem('token', res.data.payload.token)
      localStorage.setItem('user', JSON.stringify(res.data.payload))

      const successMessage = 'Login successful'
      dispatch(showToastSuccess(successMessage))
      dispatch(resetModals())
      _configAxios(res.data.payload.token)
      return res.data.payload
    } catch (error) {
      const errorMessage =
        apiErrorHandler(error as Error | AxiosError) || 'Login failed'
      dispatch(showToastError(errorMessage))
      throw new Error(errorMessage)
    }
  },
)

export const sendVerificationCode = createAsyncThunk(
  'auth/sendVerificationCode',
  async (payload: SendVerificationCodePayload, { dispatch }) => {
    try {
      const url = '/auth/account/recover'
      await axios.post(url, payload)
      const successMessage = 'Verification code is sent successfully'
      dispatch(showToastSuccess(successMessage))
    } catch (error) {
      const errorMessage =
        apiErrorHandler(error as Error | AxiosError) ||
        'Sending verification code failed'
      dispatch(showToastError(errorMessage))
      throw new Error(errorMessage)
    }
  },
)

export const checkVerificationCode = createAsyncThunk(
  'auth/checkVerificationCode',
  async (payload: CheckVerificationCodePayload, { dispatch }) => {
    try {
      const url = '/auth/code/check'
      await axios.post(url, payload)
      const successMessage = 'Verification code is valid'
      dispatch(showToastSuccess(successMessage))
      return payload
    } catch (error) {
      const errorMessage =
        apiErrorHandler(error as Error | AxiosError) ||
        'Checking verification code failed'
      dispatch(showToastError(errorMessage))
      throw new Error(errorMessage)
    }
  },
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (payload: ResetPasswordPayload, { dispatch }) => {
    try {
      const url = '/auth/password/reset'
      await axios.post(url, payload)
      const successMessage = 'Password has been reset successfully'
      dispatch(showToastSuccess(successMessage))
    } catch (error) {
      const errorMessage =
        apiErrorHandler(error as Error | AxiosError) || 'Reset password failed'
      dispatch(showToastError(errorMessage))
      throw new Error(errorMessage)
    }
  },
)

const _configAxios = (token: string) => {
  axios.defaults.headers.common['x-auth-token'] = token
}

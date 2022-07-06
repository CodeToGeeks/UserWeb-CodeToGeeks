import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  LoginPayload,
  SignUpPayload,
  SendVerificationCodePayload,
  CheckVerificationCodePayload,
  ResetPasswordPayload,
} from './models'

const BASE_URL = 'http://157.175.208.59/api/v1'

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload: SignUpPayload) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, payload)
      // redirect to verification Page
      return res.data
    } catch (e) {
      throw new Error('Error creating new account')
    }
  },
)

export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/signin`, payload)
      // save to local storage
      localStorage.setItem('token', res.data.payload.token)
      localStorage.setItem('user', JSON.stringify(res.data.payload))

      return res.data.payload
    } catch (e) {
      throw new Error('Error while signing in')
    }
  },
)

export const sendVerificationCode = createAsyncThunk(
  'auth/sendVerificationCode',
  async (payload: SendVerificationCodePayload) => {
    try {
      await axios.post(`${BASE_URL}/auth/account/recover`, payload)
    } catch (e) {
      throw new Error('Sending verification code failed')
    }
  },
)

export const checkVerificationCode = createAsyncThunk(
  'auth/checkVerificationCode',
  async (payload: CheckVerificationCodePayload) => {
    try {
      await axios.post(`${BASE_URL}/auth/code/check`, payload)
      return payload
    } catch (e) {
      throw new Error('Error while signing in')
    }
  },
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (payload: ResetPasswordPayload) => {
    try {
      await axios.post(`${BASE_URL}/auth/password/reset`, payload)
    } catch (e) {
      throw new Error('Reset Password Failed')
    }
  },
)

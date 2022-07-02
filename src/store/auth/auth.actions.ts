import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'http://18.170.251.202/api/v1'

interface SignUpPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}

interface loginPayload {
  email: string
  password: string
}

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
  async (payload: loginPayload) => {
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
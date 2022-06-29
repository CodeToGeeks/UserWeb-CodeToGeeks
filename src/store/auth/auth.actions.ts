import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'https://codetogeeksapi.herokuapp.com/api/v1'

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
      return res.data
    } catch (e) {
      throw new Error('Error while signing in')
    }
  },
)

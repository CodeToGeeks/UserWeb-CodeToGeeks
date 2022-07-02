import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { login, signUp } from './auth.actions'
import { User } from '@models/user.model'
export type authState = {
  user: User | null
  token: string
  isLoginModalOpened: boolean
  isSignUpModalOpened: boolean
  isLoading: boolean
}

const initialState: authState = {
  user: null,
  token: '',
  isLoginModalOpened: false,
  isSignUpModalOpened: false,
  isLoading: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    autoLogin: (state) => {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      state.token = token || ''
      state.user = JSON.parse(user || '{}') as User
    },
    openLoginModal: (state) => {
      state.isLoginModalOpened = true
      state.isSignUpModalOpened = false
    },
    openSignUpModal: (state) => {
      state.isSignUpModalOpened = true
      state.isLoginModalOpened = false
    },
    resetModals: (state) => {
      state.isSignUpModalOpened = false
      state.isLoginModalOpened = false
    },
    signOut: (state) => {
      // Clear state
      // Clear local storage
      state.isSignUpModalOpened = false
      state.isLoginModalOpened = false
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(signUp.pending, (state: authState) => {
        state.isLoading = true
      })
      .addCase(
        signUp.fulfilled,
        (state: authState, action: PayloadAction<User>) => {
          state.user = action.payload
          state.token = action.payload.token
          state.isLoading = false
        },
      )
      .addCase(signUp.rejected, (state: authState) => {
        state.isLoading = false
      })

      .addCase(login.pending, (state: authState) => {
        state.isLoading = true
      })
      .addCase(
        login.fulfilled,
        (state: authState, action: PayloadAction<User>) => {
          state.user = action.payload
          state.token = action.payload.token
          state.isLoginModalOpened = false
        },
      )
      .addCase(login.rejected, (state: authState) => {
        state.isLoading = false
      })
  },
})

export const {
  openLoginModal,
  openSignUpModal,
  resetModals,
  signOut,
  autoLogin,
} = authSlice.actions
export default authSlice.reducer

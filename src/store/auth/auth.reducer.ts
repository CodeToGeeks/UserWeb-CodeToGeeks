import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { login, signUp } from './auth.actions'
export type authState = {
  user: object
  token: string
  isLoginModalOpened: boolean
  isSignUpModalOpened: boolean
  isLoading: boolean
}

const initialState: authState = {
  user: {},
  token: '',
  isLoginModalOpened: false,
  isSignUpModalOpened: false,
  isLoading: false,
}

interface User {
  firstName: string
  lastName: string
  email: string
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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
        (state: authState, action: PayloadAction<{ user: User }>) => {
          state.user = action.payload.user
        },
      )
      .addCase(signUp.rejected, (state: authState) => {
        state.isLoading = true
      })

      .addCase(login.pending, (state: authState) => {
        state.isLoading = true
      })
      .addCase(
        login.fulfilled,
        (state: authState, action: PayloadAction<{ user: User }>) => {
          state.user = action.payload.user
        },
      )
      .addCase(login.rejected, (state: authState) => {
        state.isLoading = true
      })
  },
})

export const { openLoginModal, openSignUpModal, resetModals, signOut } =
  authSlice.actions
export default authSlice.reducer

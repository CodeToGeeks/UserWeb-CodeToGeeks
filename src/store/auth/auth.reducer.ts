import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

import {
  login,
  signUp,
  sendVerificationCode,
  checkVerificationCode,
  resetPassword,
  VerifyEmail,
} from './auth.actions'
import { User } from '@models/user.model'
export type authState = {
  user: User | null
  token: string
  isAuthenticated: boolean
  isLoading: boolean
  forgetPasswordEmail: string
  verificationCode: string
  isVerificationCodeSent: boolean | null
  isCorrectVerificationCode: boolean | null
  isResetPasswordSuccess: boolean | null
  emailVerified: boolean | null
}

export const initialState: authState = {
  user: null,
  token: '',
  isAuthenticated: false,
  isLoading: false,
  forgetPasswordEmail: '',
  verificationCode: '',
  isVerificationCodeSent: null,
  isCorrectVerificationCode: null,
  isResetPasswordSuccess: null,
  emailVerified: null,
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
      state.isAuthenticated = !!token
    },
    signOut: (state) => {
      localStorage.clear()
      state.user = null
      state.token = ''
      state.isAuthenticated = false
    },
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = {
        ...current(state).user,
        ...(action.payload as User),
      }
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    setVerificationCode: (state, action: PayloadAction<string>) => {
      // TODO: Save it in local storage, in case app is reloaded
      state.verificationCode = action.payload
    },
    setForgetPasswordEmail: (state, action: PayloadAction<string>) => {
      // TODO: Save it in local storage, in case app is reloaded
      state.forgetPasswordEmail = action.payload
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
          state.isAuthenticated = true
          // state.isLoginModalOpened = false
          state.isLoading = false
        },
      )
      .addCase(login.rejected, (state: authState) => {
        state.isLoading = false
      })

      .addCase(sendVerificationCode.pending, (state: authState) => {
        state.isLoading = true
        state.isVerificationCodeSent = null
      })
      .addCase(sendVerificationCode.fulfilled, (state: authState) => {
        state.isLoading = false
        state.isVerificationCodeSent = true
      })
      .addCase(sendVerificationCode.rejected, (state: authState) => {
        state.isLoading = false
        state.isVerificationCodeSent = false
      })

      .addCase(checkVerificationCode.pending, (state: authState) => {
        state.isLoading = true
        state.isCorrectVerificationCode = null
      })
      .addCase(checkVerificationCode.fulfilled, (state: authState) => {
        state.isLoading = false
        state.isCorrectVerificationCode = true
      })
      .addCase(checkVerificationCode.rejected, (state: authState) => {
        state.isLoading = false
        state.isCorrectVerificationCode = false
      })

      .addCase(resetPassword.pending, (state: authState) => {
        state.isLoading = true
        state.isResetPasswordSuccess = null
      })
      .addCase(resetPassword.fulfilled, (state: authState) => {
        state.isLoading = false
        state.isResetPasswordSuccess = true
      })
      .addCase(resetPassword.rejected, (state: authState) => {
        state.isLoading = false
        state.isResetPasswordSuccess = false
      })
      .addCase(VerifyEmail.pending, (state: authState) => {
        state.isLoading = true
        state.emailVerified = null
      })
      .addCase(
        VerifyEmail.fulfilled,
        (state: authState, action: PayloadAction<User>) => {
          state.user = action.payload
          state.token = action.payload.token
          state.isAuthenticated = true
          state.isLoading = false
          state.emailVerified = true
        },
      )
      .addCase(VerifyEmail.rejected, (state: authState) => {
        state.isLoading = false
        state.emailVerified = false
      })
  },
})

export const {
  signOut,
  autoLogin,
  setUser,
  setVerificationCode,
  setForgetPasswordEmail,
} = authSlice.actions
export default authSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

export type uiState = {
  isLoginModalOpened: boolean
  isSignUpModalOpened: boolean
}

const initialState: uiState = {
  isLoginModalOpened: false,
  isSignUpModalOpened: false,
}

export const uiSlice = createSlice({
  name: 'ui',
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
  },
})

export const { openLoginModal, openSignUpModal, resetModals } = uiSlice.actions
export default uiSlice.reducer

import { createSlice, current } from '@reduxjs/toolkit'
import { ToastType } from '@constants/toastType'

export type uiState = {
  isLoginModalOpened: boolean
  isSignUpModalOpened: boolean
  toasts: {
    id: string
    message: string
    type: ToastType
  }[]
}

const initialState: uiState = {
  isLoginModalOpened: false,
  isSignUpModalOpened: false,
  toasts: [],
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
    showToastSuccess: (state, action) => {
      state.toasts.push({
        id: `${+new Date()}`,
        type: ToastType.Success,
        message: action.payload,
      })
    },
    showToastError: (state, action) => {
      state.toasts.push({
        id: `${+new Date()}`,
        type: ToastType.Error,
        message: action.payload,
      })
    },
    showToastWarning: (state, action) => {
      state.toasts.push({
        id: `${+new Date()}`,
        type: ToastType.Warning,
        message: action.payload,
      })
    },
    showToastInfo: (state, action) => {
      state.toasts.push({
        id: `${+new Date()}`,
        type: ToastType.Info,
        message: action.payload,
      })
    },
    removeToast: (state, action) => {
      state.toasts = current(state).toasts?.filter(
        (toast) => toast.id !== action.payload,
      )
    },
  },
})

export const {
  openLoginModal,
  openSignUpModal,
  resetModals,
  showToastSuccess,
  showToastWarning,
  showToastInfo,
  showToastError,
  removeToast,
} = uiSlice.actions
export default uiSlice.reducer

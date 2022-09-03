import { configureStore } from '@reduxjs/toolkit'
import { postsSlice } from './posts'
import { authSlice } from './auth'
import { uiSlice } from './ui'
import { interactionsSlice } from './interactions'
import { accountSlice } from './account'

export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    interactions: interactionsSlice.reducer,
    account: accountSlice.reducer,
  },
  devTools: true,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

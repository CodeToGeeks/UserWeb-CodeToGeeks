import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
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

const makeStore = () => store
export const ReduxWrapper = createWrapper(makeStore)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

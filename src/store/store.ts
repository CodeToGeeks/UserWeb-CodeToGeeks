import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { postsSlice } from './posts'
import { authSlice } from './auth'
import { uiSlice } from './ui'
import { interactionsSlice } from './interactions'
export const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    interactions: interactionsSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

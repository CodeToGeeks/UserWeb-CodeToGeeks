import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { mainSlice } from './main'
import { authSlice } from './auth'
import { uiSlice } from './ui'

export const store = configureStore({
  reducer: {
    posts: mainSlice.reducer,
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
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

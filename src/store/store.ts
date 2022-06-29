import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { mainSlice } from './main'
import { authSlice } from './auth'

export const store = configureStore({
  reducer: {
    posts: mainSlice.reducer,
    auth: authSlice.reducer,
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

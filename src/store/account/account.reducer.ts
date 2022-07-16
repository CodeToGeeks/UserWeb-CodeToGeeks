import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getSavedPosts, updateAccount } from './account.actions'
import { Post } from '@models/Post.model'
export type accountState = {
  savedPosts: Post[]
  totalPostsCount: number
  isLoading: boolean
  isUpdateAccountLoading: boolean
}

const initialState: accountState = {
  savedPosts: [],
  totalPostsCount: 0,
  isLoading: false,
  isUpdateAccountLoading: false,
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getSavedPosts.pending, (state: accountState) => {
        state.isLoading = true
      })
      .addCase(
        getSavedPosts.fulfilled,
        (
          state: accountState,
          action: PayloadAction<{ savedPosts: Post[]; total: number }>,
        ) => {
          state.savedPosts = [...state.savedPosts, ...action.payload.savedPosts]
          state.totalPostsCount = action.payload.total
          state.isLoading = false
        },
      )
      .addCase(getSavedPosts.rejected, (state: accountState) => {
        state.isLoading = false
      })

      .addCase(updateAccount.pending, (state: accountState) => {
        state.isUpdateAccountLoading = true
      })
      .addCase(updateAccount.fulfilled, (state: accountState) => {
        state.isUpdateAccountLoading = false
      })
      .addCase(updateAccount.rejected, (state: accountState) => {
        state.isUpdateAccountLoading = false
      })
  },
})

export default accountSlice.reducer

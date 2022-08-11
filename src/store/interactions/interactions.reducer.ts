import { createSlice, current } from '@reduxjs/toolkit'
import { Post } from '@models/Post.model'
import { HYDRATE } from 'next-redux-wrapper'

import {
  getUserInteractions,
  lovePost,
  unlovePost,
  savePost,
  unsavePost,
} from './interactions.actions'
export type interactionsState = {
  savedPostsIds: string[]
  lovedPostsIds: string[]
  lovedPosts: Post[]
  savedPosts: Post[]
}

export const initialState: interactionsState = {
  savedPostsIds: [],
  lovedPostsIds: [],
  lovedPosts: [],
  savedPosts: [],
}

export const interactionsSlice = createSlice({
  name: 'interactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*  .addCase(HYDRATE, (state, action: any) => {
        console.log('HYDRATE interactions')
         if (action.payload.interactions.savedPostsIdss === null) return state
        state = action.payload.interactions
      })*/
      // GET USER INTERACTIONS ( saved and loved posts Ids )
      .addCase(
        getUserInteractions.fulfilled,
        (state: interactionsState, action) => {
          state.savedPostsIds = action.payload.savedPostsIds || []
          state.lovedPostsIds = action.payload.lovedPostsIds || []
        },
      )

      // LOVE POST
      .addCase(lovePost.pending, (state: interactionsState, action) => {
        const postId = action.meta.arg as unknown as string
        state.lovedPostsIds.push(postId)
      })
      .addCase(lovePost.rejected, (state: interactionsState, action) => {
        const postId = action.payload as string
        const postsIds = current(state).lovedPostsIds
        state.lovedPostsIds = postsIds.filter((id) => id !== postId)
      })

      // UN LOVE POST
      .addCase(unlovePost.pending, (state: interactionsState, action) => {
        const postId = action.meta.arg as unknown as string
        const postsIds = current(state).lovedPostsIds
        state.lovedPostsIds = postsIds.filter((id) => id !== postId)
      })
      .addCase(unlovePost.rejected, (state: interactionsState, action) => {
        const postId = action.payload as string
        state.lovedPostsIds.push(postId)
      })

      // SAVE POST
      .addCase(savePost.pending, (state: interactionsState, action) => {
        const postId = action.meta.arg as unknown as string
        state.savedPostsIds.push(postId)
      })
      .addCase(savePost.rejected, (state: interactionsState, action) => {
        const postId = action.payload as string
        const postsIds = current(state).savedPostsIds
        state.savedPostsIds = postsIds.filter((id) => id !== postId)
      })

      // UN SAVE POST
      .addCase(unsavePost.pending, (state: interactionsState, action) => {
        const postId = action.meta.arg as unknown as string
        const postsIds = current(state).savedPostsIds
        state.savedPostsIds = postsIds.filter((id) => id !== postId)
      })
      .addCase(unsavePost.rejected, (state: interactionsState, action) => {
        const postId = action.payload as string
        state.savedPostsIds.push(postId)
      })
  },
})

export default interactionsSlice.reducer

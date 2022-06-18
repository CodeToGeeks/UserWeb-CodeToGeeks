import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { Post } from '@models/Post.model'
import { Tag } from '@models/Tag.model'

import { getPosts, getTags } from './main.actions'
export type mainState = {
  posts: Post[]
  tags: Tag[]
  isLoading: boolean
  error: unknown
  page: number
  limit: number
}

const initialState: mainState = {
  isLoading: false,
  posts: [],
  tags: [],
  error: null,
  page: 0,
  limit: 0,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    populatePostsTags: (state) => {
      for (let i = 0; i < current(state).posts.length; i++) {
        const post: any = current(state).posts[i]
        for (let j = 0; j < post.tags.length; j++) {
          for (let k = 0; k < current(state).tags.length; k++) {
            if (post.tags[j] == current(state).tags[k]._id) {
              state.posts[i].tags[j] = current(state).tags[k]
              console.log(state.posts[i].tags[j])
            }
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state: mainState) => {
        state.isLoading = true
      })
      .addCase(
        getPosts.fulfilled,
        (state: mainState, action: PayloadAction<Post[]>) => {
          state.isLoading = false
          state.posts = action.payload
        },
      )
      .addCase(getPosts.rejected, (state: mainState) => {
        state.isLoading = true
      })

      .addCase(getTags.pending, (state: mainState) => {
        state.isLoading = true
      })
      .addCase(
        getTags.fulfilled,
        (state: mainState, action: PayloadAction<Tag[]>) => {
          state.isLoading = false
          state.tags = action.payload
        },
      )
      .addCase(getTags.rejected, (state: mainState) => {
        state.isLoading = true
      })
  },
})

export const { populatePostsTags } = mainSlice.actions
export default mainSlice.reducer

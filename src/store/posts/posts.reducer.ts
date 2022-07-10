import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { Post } from '@models/Post.model'
import { Tag } from '@models/Tag.model'

import {
  getPosts,
  getTags,
  getPostDetails,
  getPostsByTagId,
} from './posts.actions'
export type postsState = {
  posts: Post[]
  post: Post | null
  totalPostsCount: number
  tags: Tag[]
  searchKeyword: string
  isLoading: boolean
  error: unknown
}

const initialState: postsState = {
  posts: [],
  post: null,
  totalPostsCount: 1,
  tags: [],
  searchKeyword: '',
  isLoading: false,
  error: null,
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    populatePostsTags: (state) => {
      for (let i = 0; i < current(state).posts.length; i++) {
        const post: any = current(state).posts[i]
        for (let j = 0; j < post.tags.length; j++) {
          for (let k = 0; k < current(state).tags.length; k++) {
            if (post.tags[j] == current(state).tags[k]._id) {
              state.posts[i].tags[j] = current(state).tags[k]
            }
          }
        }
      }
    },
    resetPosts: (state) => {
      state.posts = []
      state.totalPostsCount = 1
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload
    },
    incrementPostLoveCount: (state, action) => {
      const postId = action.payload
      state.posts = current(state).posts.map((post: Post) => {
        if (post._id === postId)
          return {
            ...post,
            love_count: +post.love_count + 1 || 1,
          }
        return post
      })
    },
    decrementPostLoveCount: (state, action) => {
      const postId = action.payload
      state.posts = current(state).posts.map((post: Post) => {
        if (post._id === postId)
          return {
            ...post,
            love_count: +post.love_count - 1 || 0,
          }
        return post
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state: postsState) => {
        state.isLoading = true
      })
      .addCase(
        getPosts.fulfilled,
        (
          state: postsState,
          action: PayloadAction<{ posts: Post[]; total: number }>,
        ) => {
          state.isLoading = false
          state.posts = [...state.posts, ...action.payload.posts]
          state.totalPostsCount = action.payload.total
        },
      )
      .addCase(getPosts.rejected, (state: postsState) => {
        state.isLoading = true
      })

      .addCase(getTags.pending, (state: postsState) => {
        state.isLoading = true
      })
      .addCase(
        getTags.fulfilled,
        (state: postsState, action: PayloadAction<Tag[]>) => {
          state.isLoading = false
          state.tags = action.payload
        },
      )
      .addCase(getTags.rejected, (state: postsState) => {
        state.isLoading = true
      })

      .addCase(getPostDetails.pending, (state: postsState) => {
        state.isLoading = true
      })
      .addCase(
        getPostDetails.fulfilled,
        (state: postsState, action: PayloadAction<Post>) => {
          state.isLoading = false
          state.post = action.payload
        },
      )
      .addCase(getPostDetails.rejected, (state: postsState) => {
        state.isLoading = true
      })

      .addCase(getPostsByTagId.pending, (state: postsState) => {
        state.isLoading = true
      })
      .addCase(
        getPostsByTagId.fulfilled,
        (
          state: postsState,
          action: PayloadAction<{ posts: Post[]; total: number }>,
        ) => {
          state.isLoading = false
          state.posts = action.payload.posts
          state.totalPostsCount = action.payload.total
        },
      )
      .addCase(getPostsByTagId.rejected, (state: postsState) => {
        state.isLoading = true
      })
  },
})

export const {
  populatePostsTags,
  resetPosts,
  setSearchKeyword,
  incrementPostLoveCount,
  decrementPostLoveCount,
} = postsSlice.actions
export default postsSlice.reducer

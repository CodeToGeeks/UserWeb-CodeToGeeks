import {
  createSlice,
  PayloadAction,
  current,
  createAction,
} from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { diff } from 'json-diff'

import type { RootState } from '@store/store'
import { Post } from '@models/Post.model'
import { Tag } from '@models/Tag.model'
import {
  getPosts,
  getTags,
  getPostDetails,
  getPostsByTagId,
} from './posts.actions'

const hydrate = createAction<RootState>(HYDRATE)

export type postsState = {
  posts: Post[]
  post: Post | null
  pageNumber: number
  totalPostsCount: number
  tags: Tag[]
  searchKeyword: string
  isLoading: boolean
  error: unknown
}

export const initialState: postsState = {
  posts: [],
  post: null,
  pageNumber: 1,
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
    resetPosts: (state) => {
      state.posts = []
      state.totalPostsCount = 1
      state.pageNumber = 1
    },
    setSearchKeyword: (state, action) => {
      state.posts = []
      state.searchKeyword = action.payload
      state.totalPostsCount = 1
      state.pageNumber = 1
    },
    incrementPostLoveCount: (state, action) => {
      const postId = action.payload
      // Increment love count of post in posts array
      state.posts = current(state).posts.map((post: Post) => {
        if (post._id === postId)
          return {
            ...post,
            love_count: +post.love_count + 1 || 1,
          }
        return post
      })
      //  Increment love count of the post if it is currently being viewed
      if (state.post && state.post._id === postId) {
        state.post.love_count = +state.post.love_count + 1 || 1
      }
    },
    decrementPostLoveCount: (state, action) => {
      const postId = action.payload
      // Decrement love count of post in posts array
      state.posts = current(state).posts.map((post: Post) => {
        if (post._id === postId)
          return {
            ...post,
            love_count: +post.love_count - 1 || 0,
          }
        return post
      })
      //  Decrement love count of the post if it is currently being viewed
      if (state.post && state.post._id === postId) {
        state.post.love_count = +state.post.love_count - 1 || 0
      }
    },
    incrementPageNumber: (state) => {
      state.pageNumber++
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        if (diff(state.post, action.payload.posts.post))
          state.post = action.payload.posts.post

        if (diff(state.posts, action.payload.posts.posts))
          state.posts = [...action.payload.posts.posts]

        if (diff(state.totalPostsCount, action.payload.posts.totalPostsCount))
          state.totalPostsCount = action.payload.posts.totalPostsCount

        if (diff(state.pageNumber, action.payload.posts.pageNumber))
          state.pageNumber = action.payload.posts.pageNumber

        if (diff(state.searchKeyword, action.payload.posts.searchKeyword))
          state.searchKeyword = action.payload.posts.searchKeyword

        if (diff(state.tags, action.payload.posts.tags))
          state.tags = action.payload.posts.tags
      })

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
  resetPosts,
  setSearchKeyword,
  incrementPostLoveCount,
  decrementPostLoveCount,
  incrementPageNumber,
} = postsSlice.actions
export default postsSlice.reducer

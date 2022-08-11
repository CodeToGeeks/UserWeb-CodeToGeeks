import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { Post } from '@models/Post.model'
import { Tag } from '@models/Tag.model'
import { diff } from '../../common/utils/jsonCompare'
import {
  getPosts,
  getTags,
  getPostDetails,
  getPostsByTagId,
} from './posts.actions'
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
    resetPosts: (state: any) => {
      state.posts = []
      state.totalPostsCount = 1
      state.pageNumber = 1
    },
    setSearchKeyword: (state: any, action: any) => {
      state.searchKeyword = action.payload
      state.pageNumber = 1
    },
    incrementPostLoveCount: (state: any, action: any) => {
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
    decrementPostLoveCount: (state: any, action: any) => {
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
    incrementPageNumber: (state: any) => {
      state.pageNumber++
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: any) => {
        // console.log('HYDRATE posts', action.payload.posts)
        // console.log('defff', )

        if (diff(state.post, action.payload.posts.post))
          state.post = action.payload.posts.post

        if (diff(state.posts, action.payload.posts.posts))
          state.posts = [...action.payload.posts.posts]

        if (diff(state.totalPostsCount, action.payload.posts.totalPostsCount))
          state.totalPostsCount = action.payload.posts.totalPostsCount

        if (diff(state.pageNumber, action.payload.posts.pageNumber))
          state.pageNumber = action.payload.posts.pageNumber

        if (diff(state.tags, action.payload.posts.tags))
          state.tags = action.payload.posts.tags

        if (diff(state.searchKeyword, action.payload.posts.searchKeyword))
          state.searchKeyword = action.payload.posts.searchKeyword

        if (diff(state.isLoading, action.payload.posts.isLoading))
          state.isLoading = action.payload.posts.isLoading

        if (diff(state.error, action.payload.posts.error))
          state.error = action.payload.posts.error
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

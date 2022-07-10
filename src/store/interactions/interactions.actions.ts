import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiErrorHandler } from '@utils/apiErrorHandler'
import { showToastError, showToastSuccess } from '@store/ui'

export const lovePost = createAsyncThunk(
  'posts/lovePost',
  async (postId: string, { dispatch, rejectWithValue }) => {
    try {
      await axios.post(`/post/love/${postId}`)
      return postId
    } catch (e) {
      const errorMessage = apiErrorHandler(e as Error | AxiosError)
      dispatch(showToastError(errorMessage))
      return rejectWithValue(postId)
    }
  },
)

export const unlovePost = createAsyncThunk(
  'posts/unlovePost',
  async (postId: string, { dispatch, rejectWithValue }) => {
    try {
      await axios.post(`/post/unlove/${postId}`)
    } catch (e) {
      const errorMessage = apiErrorHandler(e as Error | AxiosError)
      dispatch(showToastError(errorMessage))
      return rejectWithValue(postId as string)
    }
  },
)

export const savePost = createAsyncThunk(
  'posts/savePost',
  async (postId: string, { dispatch }) => {
    try {
      await axios.post(`/post/save/${postId}`)
      dispatch(showToastSuccess('Added to saved posts'))
    } catch (e) {
      const errorMessage = apiErrorHandler(e as Error | AxiosError)
      dispatch(showToastError(errorMessage))
      throw new Error(errorMessage)
    }
  },
)

export const unsavePost = createAsyncThunk(
  'posts/unsavePost',
  async (postId: string, { dispatch }) => {
    try {
      await axios.post(`/post/unsave/${postId}`)
      dispatch(showToastSuccess('Removed from saved posts'))
    } catch (e) {
      const errorMessage = apiErrorHandler(e as Error | AxiosError)
      dispatch(showToastError(errorMessage))
      throw new Error(errorMessage)
    }
  },
)

export const getUserInteractions = createAsyncThunk(
  'posts/getUserInteractions',
  async (payload, { dispatch }) => {
    try {
      const res = await axios.get('/account/interactions')
      return {
        savedPostsIds: res.data.payload.savedPosts,
        lovedPostsIds: res.data.payload.lovedPosts,
      }
    } catch (e) {
      const errorMessage = apiErrorHandler(e as Error | AxiosError)
      dispatch(showToastError(errorMessage))
      throw new Error(errorMessage)
    }
  },
)

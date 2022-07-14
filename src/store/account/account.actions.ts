import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { showToastError } from '@store/ui'
import { apiErrorHandler } from '@utils/apiErrorHandler'

interface Query {
  pageSize: number
  pageNumber: number
  search?: string
}
// TODO: Add types for API response
export const getSavedPosts = createAsyncThunk(
  'posts/getSavedPosts',
  async (payload: Query, { dispatch }) => {
    try {
      const { pageSize, pageNumber, search } = payload
      const res = await axios.get('/post/save', {
        params: {
          pageSize,
          pageNumber,
          search,
        },
      })
      return res.data
    } catch (error) {
      const errorMessage =
        apiErrorHandler(error as Error | AxiosError) ||
        'Error while getting saved posts'
      dispatch(showToastError(errorMessage))
      throw new Error(errorMessage)
    }
  },
)

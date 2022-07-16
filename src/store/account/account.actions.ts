import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { showToastError, showToastSuccess } from '@store/ui'
import { setUser } from '@store/auth'
import { apiErrorHandler } from '@utils/apiErrorHandler'
import { User } from '@models/user.model'
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

export const updateAccount = createAsyncThunk(
  'account/updateAccount',
  async (payload: Partial<User>, { dispatch }) => {
    try {
      await axios.patch('/account', payload)
      dispatch(setUser(payload))
      dispatch(showToastSuccess('Account updated successfully'))
    } catch (error) {
      const errorMessage =
        apiErrorHandler(error as Error | AxiosError) ||
        'Error while updating account'
      dispatch(showToastError(errorMessage))
      throw new Error(errorMessage)
    }
  },
)

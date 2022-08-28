import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface Query {
  pageSize: number
  pageNumber: number
  search?: string
}

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (payload: Query) => {
    try {
      const { pageSize, pageNumber, search } = payload
      const res = await axios.get('/post/', {
        params: {
          pageSize,
          pageNumber,
          search,
        },
      })
      return res.data
    } catch (e) {
      throw new Error('Error getting posts')
    }
  },
)

export const getTags = createAsyncThunk('posts/getTags', async () => {
  try {
    const res = await axios.get('/tag?pageNumber=1&pageSize=1000')
    return res.data.tags
  } catch (e) {
    throw new Error('Error getting tags')
  }
})

export const getPostDetails = createAsyncThunk(
  'posts/getPostDetails',
  async (payload: { slug: string }) => {
    try {
      const { slug } = payload
      const res = await axios.get(`/post/${slug}`)
      return res.data.post
    } catch (e) {
      throw new Error('Error getting post details')
    }
  },
)

export const getPostsByTagId = createAsyncThunk(
  'posts/getPostsByTagId',
  async (payload: { query: Query; tagId: string }) => {
    try {
      const { tagId } = payload
      const res = await axios.get(`/post/tag/${tagId}`, {
        params: payload.query,
      })
      return res.data
    } catch (e) {
      throw new Error('Error getting tag post')
    }
  },
)

import axios from 'axios'

import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'https://codetogeeksapi.herokuapp.com/api/v1'

interface query {
  pageSize: number
  pageNumber: number
  search?: string
}

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (payload: query) => {
    try {
      const { pageSize, pageNumber, search } = payload
      const res = await axios.get(`${BASE_URL}/post`, {
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
    const res = await axios.get(`${BASE_URL}/tag?pageNumber=1&pageSize=1000`)
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
      const res = await axios.get(`${BASE_URL}/post/${slug}`)
      return res.data.post
    } catch (e) {
      throw new Error('Error getting tags')
    }
  },
)

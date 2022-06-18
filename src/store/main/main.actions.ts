import axios from 'axios'

import { createAsyncThunk } from '@reduxjs/toolkit'

const BASE_URL = 'https://codetogeeksapi.herokuapp.com/api/v1'

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const res = await axios.get(`${BASE_URL}/post?pageNumber=1&pageSize=10`)
    return res.data.posts
  } catch (e) {
    throw new Error('Error getting posts')
  }
})

export const getTags = createAsyncThunk('posts/getTags', async () => {
  try {
    const res = await axios.get(`${BASE_URL}/tag?pageNumber=1&pageSize=1000`)
    return res.data.tags
  } catch (e) {
    throw new Error('Error getting tags')
  }
})

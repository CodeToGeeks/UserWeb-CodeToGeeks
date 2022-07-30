import { combineReducers, AnyAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { postsSlice, postsState, initialState as postsInit } from './posts'
import { authSlice, authState, initialState as authInit } from './auth'
import { uiSlice, uiState, initialState as uiInit } from './ui'
import {
  interactionsSlice,
  interactionsState,
  initialState as interactionsInit,
} from './interactions'
import {
  accountSlice,
  accountState,
  initialState as accountInit,
} from './account'

const combineReducer = combineReducers({
  posts: postsSlice.reducer,
  auth: authSlice.reducer,
  ui: uiSlice.reducer,
  interactions: interactionsSlice.reducer,
  account: accountSlice.reducer,
})

type AppInitState = {
  posts: postsState
  auth: authState
  ui: uiState
  interactions: interactionsState
  account: accountState
}

const appInit = {
  posts: postsInit,
  auth: authInit,
  ui: uiInit,
  interactions: interactionsInit,
  account: accountInit,
}

export const masterReducer = (
  state: AppInitState = appInit,
  action: AnyAction,
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      posts: {
        ...postsInit,
        posts: [...action.payload.posts.posts],
        totalPostsCount:
          action.payload.posts.totalPostsCount || state?.posts.totalPostsCount,
        pageNumber: action.payload.posts.pageNumber || state?.posts.pageNumber,
        post: action.payload.posts.post || state?.posts.post,
        isLoading: action.payload.posts.isLoading || state?.posts.isLoading,
        tags: action.payload.posts.tags || state?.posts.tags,
      },
      auth: authInit,
      ui: uiInit,
      interactions: interactionsInit,
      account: accountInit,
    }
    console.log({
      posts: nextState.posts,
    })
    return nextState as AppInitState
  }
  return combineReducer(state, action)
}

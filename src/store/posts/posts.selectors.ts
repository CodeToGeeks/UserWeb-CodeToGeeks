import { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

export const selectQuote = (state: RootState) => state.posts

export const postsSelector = createSelector(selectQuote, (state) => state)

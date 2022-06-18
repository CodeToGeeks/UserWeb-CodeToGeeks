import { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

export const selectQuote = (state: RootState) => state.posts

export const mainSelector = createSelector(selectQuote, (state) => state)

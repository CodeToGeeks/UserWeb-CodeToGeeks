import { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

export const selectQuote = (state: RootState) => state.auth

export const authSelector = createSelector(selectQuote, (state) => state)

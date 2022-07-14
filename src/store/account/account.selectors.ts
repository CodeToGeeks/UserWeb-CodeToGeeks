import { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

export const selectQuote = (state: RootState) => state.account

export const accountSelector = createSelector(selectQuote, (state) => state)

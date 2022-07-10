import { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

export const selectQuote = (state: RootState) => state.interactions

export const interactionsSelector = createSelector(
  selectQuote,
  (state) => state,
)

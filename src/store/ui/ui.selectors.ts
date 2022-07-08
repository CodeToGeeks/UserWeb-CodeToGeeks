import { RootState } from '../store'
import { createSelector } from '@reduxjs/toolkit'

export const selectQuote = (state: RootState) => state.ui

export const uiSelector = createSelector(selectQuote, (state) => state)

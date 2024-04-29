import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import factService from './factService'

const initialState = {
  facts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}
export const factSlice = createSlice({
  name: 'fact',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {},
})

export const { reset } = factSlice.actions
export default factSlice.reducer

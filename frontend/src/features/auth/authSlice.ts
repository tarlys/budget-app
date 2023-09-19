import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../auth/authService'

// Get user from local storage

// const getUser = localStorage.getItem('user') || 'Parse Error'
const user = JSON.parse(localStorage.getItem('user')!)

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

console.log(initialState)

export const register: any = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  console.log(user)
  try {
    return await authService.register(user)
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    ///const message = error.response?.data?.message?||error.message||error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

// Login user
export const login: any = createAsyncThunk('auth/login', async (user: {}, thunkAPI) => {
  try {
    return await authService.login(user)
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    ///const message = error.response?.data?.message?||error.message||error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Logour user
export const logout: any = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isLoading = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        state.user = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
      })
  },
})

export const { reset } = authSlice.actions

export default authSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//Create new ticket

export const createTicket: any = createAsyncThunk('tickets/create', async (ticketData, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ticketService.createTicket(ticketData, token)
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    ///const message = error.response?.data?.message?||error.message||error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Update ticket
export const updateTicket: any = createAsyncThunk('tickets/update', async (ticketUpdateData: { ticketId: string; formData: {} }, thunkAPI: any) => {
  const { ticketId, formData } = ticketUpdateData
  try {
    const token = thunkAPI.getState().auth.user.token

    return await ticketService.updateTicket(ticketId, formData, token)
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    ///const message = error.response?.data?.message?||error.message||error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Get user tickets
export const getUserTickets: any = createAsyncThunk('tickets/getAll', async (_, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ticketService.getUserTickets(token)
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    ///const message = error.response?.data?.message?||error.message||error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
//Get all tickets
export const getAllTickets: any = createAsyncThunk('tickets/getAllTickets', async (query, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ticketService.getAllTickets(query, token)
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    ///const message = error.response?.data?.message?||error.message||error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

//Get user ticket
export const getTicket: any = createAsyncThunk('tickets/get', async (ticketId, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ticketService.getTicket(ticketId, token)
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    ///const message = error.response?.data?.message?||error.message||error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
//Delete user ticket
export const deleteTicket: any = createAsyncThunk('tickets/delete', async (ticketId, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await ticketService.deleteTicket(ticketId, token)
  } catch (error: any) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    ///const message = error.response?.data?.message?||error.message||error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateTicket.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getUserTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getUserTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload
      })
      .addCase(getUserTickets.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getAllTickets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = action.payload
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = action.payload
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = ticketSlice.actions
export default ticketSlice.reducer

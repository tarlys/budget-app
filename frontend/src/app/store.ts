import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import ticketReducer from '../features/tickets/ticketSlice'
import factReducer from '../features/fact/factSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ticket: ticketReducer,
    fact: factReducer,
  },
})

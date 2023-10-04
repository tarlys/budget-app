import axios from 'axios'
const API_URL = '/api/tickets/'

//Create ticket
const createTicket = async (ticketData: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, ticketData, config)

  return response.data
}

//Update ticket
const updateTicket = async (ticketId: any, ticketData: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + ticketId, ticketData, config)
  return response.data
}

// Get user tickets
const getUserTickets = async (token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Get all tickets
const getAllTickets = async (query: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + `all/${query}`, config)

  return response.data
}

// Get ticket
const getTicket = async (ticketId: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + ticketId, config)

  return response.data
}
// Delete ticket
const deleteTicket = async (ticketId: any, token: any) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + ticketId, config)

  return response.data
}

const ticketService = {
  createTicket,
  getUserTickets,
  getTicket,
  getAllTickets,
  updateTicket,
  deleteTicket,
}

export default ticketService

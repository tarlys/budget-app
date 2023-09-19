const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

//@desk     Get current user
//@route    GET /api/tickets
//@access   Private

const getTickets = asyncHandler(async (request, response) => {
  //Get user using JWT

  const user = await User.findById(request.user.id)
  if (!user) {
    response.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({ user: request.user.id })

  response.status(200).json(tickets)
})

//@desk     Get current user
//@route    POST /api/tickets
//@access   Private

const createTicket = asyncHandler(async (request, response) => {
  response.status(200).json({ message: 'createTickets' })
})

module.exports = {
  getTickets,
  createTicket,
}

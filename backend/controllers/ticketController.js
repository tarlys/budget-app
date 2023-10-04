const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

//@desk     Get current user tickets
//@route    GET /api/tickets
//@access   Private

const getUserTickets = asyncHandler(async (request, response) => {
  //Get user using JWT

  const user = await User.findById(request.user.id)
  if (!user) {
    response.status(401)
    throw new Error('User not found')
  }

  const tickets = await Ticket.find({ user: request.user.id })

  response.status(200).json(tickets)
})

//@desk     Get current user ticket
//@route    GET /api/tickets/:id
//@access   Private

const getTicket = asyncHandler(async (request, response) => {
  //Get user using JWT

  const user = await User.findById(request.user.id)
  if (!user) {
    response.status(401)
    throw new Error('User not found')
  }

  if (user || user.isAdmin) {
    const ticket = await Ticket.findById(request.params.id)

    if (!ticket) {
      response.status(404)
      throw new Error('Ticket not found')
    }

    if (ticket.user.toString() !== request.user.id && !user.isAdmin) {
      response.status(401)
      throw new Error('Not Authorized')
    }

    response.status(200).json(ticket)
  }
})
//@desk     Update ticket
//@route    PUT /api/tickets/:id
//@access   Private

const updateTicket = asyncHandler(async (request, response) => {
  //Get user using JWT

  const user = await User.findById(request.user.id)
  if (!user) {
    response.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(request.params.id)

  if (!ticket) {
    response.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== request.user.id && !user.isAdmin) {
    response.status(401)
    throw new Error('Not Authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(request.params.id, request.body, { new: true })

  response.status(200).json(updatedTicket)
})

//@desk     Delete  ticket
//@route    DELETE /api/tickets/:id
//@access   Private

const deleteTicket = asyncHandler(async (request, response) => {
  //Get user using JWT

  const user = await User.findById(request.user.id)
  if (!user) {
    response.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.findById(request.params.id)

  if (!ticket) {
    response.status(404)
    throw new Error('Ticket not found')
  }

  if (ticket.user.toString() !== request.user.id) {
    response.status(401)
    throw new Error('Not Authorized')
  }

  await Ticket.findByIdAndRemove(request.params.id)

  response.status(200).json({ success: true })
})

//@desk     Get all tickets to admin user
//@route    GET /api/tickets
//@access   Private
//@status   'onSubmit','all','submitted','decline','onDraft','return'

const getAllTickets = asyncHandler(async (request, response) => {
  const status = request.params.status
  const query = status === 'all' ? {} : { status }
  //Get user using JWT

  const user = await User.findById(request.user.id)
  if (!user) {
    response.status(401)
    throw new Error('User not found')
  }
  if (user.isAdmin) {
    // const tickets = await Ticket.find({ status: 'onSubmit' })
    const tickets = await Ticket.find(query)
    response.status(200).json(tickets)
  }
})

//@desk     Get current user
//@route    POST /api/tickets
//@access   Private

const createTicket = asyncHandler(async (request, response) => {
  const { price, count, summary, id, date, username, applicationType, company, unit, place, type, applicationName, spareParts, month, needless, provider, comment, status, time } = request.body

  if (!company || !status) {
    response.status(400)
    throw new Error('Please add company and check status')
  }

  const user = await User.findById(request.user.id)

  const numAdventures = await Ticket.estimatedDocumentCount()

  if (!user) {
    response.status(401)
    throw new Error('User not found')
  }

  const ticket = await Ticket.create({
    user: request.user.id,
    price,
    count,
    summary,
    applicationId: `${company}-${numAdventures}`,
    date,
    username,
    applicationType,
    date,
    time,
    company,
    unit,
    place,
    type,
    applicationName,
    spareParts,
    month,
    needless,
    provider,
    comment,
    status,
  })

  response.status(200).json(ticket)
})

module.exports = {
  getUserTickets,
  getAllTickets,
  getTicket,
  updateTicket,
  deleteTicket,
  createTicket,
}

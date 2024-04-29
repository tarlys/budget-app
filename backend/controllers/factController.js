const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Fact = require('../models/factModel')
const Ticket = require('../models/ticketModel')

//@desk     Get facts for ticket
//@route    GET /api/tickets/:ticketId/facts
//@access   Private

const getFacts = asyncHandler(async (request, response) => {
  const ticket = await Ticket.findById(request.params.ticketId)

  if (ticket.user.toString() !== request.user.id) {
    response.status(401)
    throw new Error('User not authorized')
  }

  const facts = await Fact.find({ ticket: request.params.ticketId })

  response.status(200).json(facts)
})
//@desk     Create fact for ticket
//@route    POST /api/tickets/:ticketId/facts
//@access   Private

// const createFact = asyncHandler(async (request, response) => {
//   //Get user using JWT

//   const user = await User.findById(request.user.id)
//   if (!user) {
//     response.status(401)
//     throw new Error('User not found')
//   }

//   const ticket = await Ticket.findById(request.params.ticketId)

//   if (ticket.user.toString() !== request.user.id) {
//     response.status(401)
//     throw new Error('User not authorized')
//   }

//   const fact = await Fact.create({ ticket: request.params.ticketId })

//   response.status(200).json(fact)
// })

const createFact = asyncHandler(async (request, response) => {
  const { price, count, summary, date, username, applicationType, company, unit, place, type, applicationName, spareParts, month, needless, provider, comment, status, time } = request.body
  console.log(request.body)

  if (!company || !status) {
    response.status(400)
    throw new Error('Please add company and check status')
  }

  // const user = await User.findById(request.user.id)

  // if (!user) {
  //   response.status(401)
  //   throw new Error('User not found')
  // }
  const numAdventures = await Fact.estimatedDocumentCount()

  const ticket = await Ticket.findById(request.params.ticketId)

  if (ticket.user.toString() !== request.user.id) {
    response.status(401)
    throw new Error('User not authorized')
  }

  const fact = await Fact.create({
    user: request.user.id,
    ticket: request.params.ticketId,
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

  response.status(200).json(fact)
})

module.exports = { getFacts, createFact }

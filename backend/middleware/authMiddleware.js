const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (request, response, next) => {
  let token

  if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
    try {
      //Get token from heaeder
      token = request.headers.authorization.split(' ')[1]
      //Vetify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      //Get user from token
      request.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      response.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    response.status(401)
    throw new Error('Not authorized')
  }
})

module.exports = { protect }

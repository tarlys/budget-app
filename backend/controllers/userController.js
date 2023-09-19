const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')

//@desk     register user
//@route    /api/users/
//@access   public

const registerUser = asyncHandler(async (request, response) => {
  const { name, password, email, isAdmin } = request.body

  //Validation
  if (!name || !password || !email) {
    response.status(400)
    throw new Error('Please include all fields')
  }

  // Find if user already exsits
  const userExists = await User.findOne({ email })
  if (userExists) {
    response.status(400)
    throw new Error('User already exists')
  }

  //Hash password

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isAdmin,
  })

  if (user) {
    response.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    response.status(400)
    throw new Error('Invalid user data')
  }
})
//@desk     login user
//@route    /api/users/login
//@access   public
const loginUser = asyncHandler(async (request, response) => {
  const { password, email } = request.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    response.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    response.status(401)
    throw new Error('Invalid credentials')
  }
})

//@desk     Get current user
//@route    /api/users/me
//@access   Private

const getMe = asyncHandler(async (request, response) => {
  const user = {
    id: request.user._id,
    name: request.user.name,
    email: request.user.email,
  }
  response.status(200).json(user)
})

///GEnerate JWT token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
}

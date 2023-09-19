const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (request, response) => {
  response.status(200).json({ message: 'Welcome to budget app!' })
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on ${PORT}`))

const path = require('path')
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

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

if (process.env.NODE_ENV === 'production') {
  //Set build forlder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (requset, response) => response.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
  app.get('/', (request, response) => {
    response.status(200).json({ message: 'Welcome to budget app!' })
  })
}
app.use(errorHandler)


app.listen(PORT, () => console.log(`Server started on ${PORT}`))

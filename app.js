// import
const express = require('express')
const cors = require('cors')

// requiring the connection with Database
require('./DB/dbConn')

// const cookieParser = require('cookie-parser');

// app instance
const app = express()

// middleware

// express json middleware for handling request in json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// middleware for handling CORS request
app.use(cors())
// middleware for accessing cookie directly
// app.use(cookieParser());

// port config

const PORT = process.env.PORT || 8000

console.log('Starting backend express server')
// listening to port for running backend server
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`)
})

// routes

// home route
app.get('/', (req, res) => {
  res.send('Hi, I am first API are you up for development and fun!!')
})

// route for github login controllers
app.use('/api', require('./routes/userRoutes'))
app.use('/api', require('./routes/expenseRoutes'))
app.use('/api', require('./routes/incomeRoutes'))

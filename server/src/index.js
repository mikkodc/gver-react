// import libraries
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

// import environment variables
require('dotenv').config()

// import middlewares
const middlewares = require('./middlewares')

// api gateway routes
const userRole = require('./api/userRole')
const userType = require('./api/userType')
const country = require('./api/country')

const app = express()

// db connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// middlewares
app.use(morgan('common'))
app.use(helmet())
app.use(cors({
  origin: process.env.CORS_ORIGIN
}))
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  })
})

app.use('/api/user/role', userRole)
app.use('/api/user/type', userType)
app.use('/api/country', country)

// not found middleware
app.use(middlewares.notFound)

// error middleware
app.use(middlewares.errorHandler)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
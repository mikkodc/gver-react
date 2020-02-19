// import libraries
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

// import middlewares
const middlewares = require('./middlewares')

const app = express()

// middlewares
app.use(morgan('common'))
app.use(helmet())
app.use(cors({
  origin: 'http://localhost:8080'
}))

require('dotenv').config()

// db connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
})

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // * => allow all origins
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Accept'); // add remove headers according to your needs
  next()
})

// api gateway routes
const subscribersRouter = require('./routes/subscribers.route')
const walletsRouter = require('./routes/wallets.route')
const budgetsRouter = require('./routes/budgets.route')

app.use('/subscribers', subscribersRouter)
app.use('/wallets', walletsRouter)
app.use('/budgets', budgetsRouter)

// not found middleware
app.use(middlewares.notFound)

// error middleware
app.use(middlewares.errorHandler)

app.listen(3000, () => console.log('server started'))
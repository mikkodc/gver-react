const mongoose = require('mongoose')
const Schema = mongoose.Schema

const walletSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Wallet', walletSchema)
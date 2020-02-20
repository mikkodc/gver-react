const mongoose = require('mongoose')
const Schema = mongoose.Schema

const requiredNumber = {
  type: Number,
  required: true
}

const userSchema = new Schema({
  role: requiredNumber,
  type: requiredNumber,
  subscribedChannel: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('User', userSchema)
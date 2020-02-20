//https://stackoverflow.com/questions/18543790/mongoose-objectid-to-number/18545319

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userTypeSchema = new Schema({
  title: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('UserType', userTypeSchema)
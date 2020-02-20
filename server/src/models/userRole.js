const mongoose = require('mongoose')
const { Schema } = mongoose

const userRoleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model('UserRole', userRoleSchema)
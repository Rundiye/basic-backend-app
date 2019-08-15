'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: String,
  mytrips: [{
    type: ObjectId,
    ref: 'Trip'
  }],
  favorites: [{
    type: ObjectId,
    ref: 'Activity'
  }]
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User

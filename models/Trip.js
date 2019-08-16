'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const tripSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  description: {
    type: String
  },
  budget: {
    type: Number,
    min: 0,
    required: true
  },
  totalDays: [{
    type: ObjectId,
    ref: 'Day'
  }],
  participants: [{
    type: ObjectId,
    ref: 'User'
  }]
},
{
  timestamps: true
})

const Trip = mongoose.model('Trip', tripSchema)

module.exports = Trip

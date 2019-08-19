'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const daySchema = new Schema({
  date: {
    type: String
  },
  expenses: Number,
  activities: [{
    type: ObjectId,
    ref: 'Activity'
  }],
  trip: [{
    type: ObjectId,
    ref: 'Trip'
  }]
},
{
  timestamps: true
})

const Day = mongoose.model('Day', daySchema)

module.exports = Day

'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const activitySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  activityType: {
    type: String,
    required: true,
    Enum: ['Flight', 'Accomodation', 'Food', 'Cultural', 'Nightlife', 'others']
  },
  trip: [{
    type: ObjectId,
    ref: 'Trip'
  }]
},
{
  timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;

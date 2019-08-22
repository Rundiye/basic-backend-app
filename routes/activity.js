'use strict'

const express = require('express')
const Activity = require('../models/Activity')
const Day = require('../models/Day')
const Trip = require('../models/Trip')
const router = express.Router()

router.get('/activities', async (req, res, next) => {
  const { dayId } = req.params
  try {
    const activities = await Day.find(dayId).populate('activities')
    res.status(200).json(activities)
  } catch (error) {
    next(error)
  }
})

router.post('/activities/new/:dayId', async (req, res, next) => {
  const { title, address, price, description, activityType, trip } = req.body
  const { dayId } = req.params

  try {
    const newActivity = await Activity.create({
      title,
      address,
      price,
      description,
      activityType,
      trip
    })

    const { _id } = newActivity
    const updatedDay = await Day.findByIdAndUpdate(dayId, { $push: { activities: _id } }, { new: true })

    const updatedTrip = await Trip.findById(updatedDay.trip[0])
      .populate('totalDays')
      .populate({
        path: 'totalDays',
        populate: {
          path: 'activities'
        }
      })

    res.status(200).json(updatedTrip)
  } catch (error) {
    next(error)
  }
})

router.get('/activities/:id/', async (req, res, next) => {
  const { id } = req.params

  try {
    const activity = await Activity.findById(id)
    res.status(200).json(activity)
  } catch (error) {
    next(error)
  }
})

router.put('/activities/:id/update', async (req, res, next) => {
  const { id } = req.params
  const { title, address, price, description, activityType, trip } = req.body
  const activityUpdated = { title, address, price, description, activityType, trip }

  try {
    const updated = await Activity.findByIdAndUpdate(id, activityUpdated, { new: true })
    res.status(200).json(updated)
  } catch (error) {
    next(error)
  }
})

router.delete('/activities/:id/delete', async (req, res, next) => {
  const { id } = req.params

  try {
    await Activity.findByIdAndDelete(id)
    res.status(200).json({ message: 'activity deleted' })
  } catch (error) {
    next(error)
  }
})

module.exports = router

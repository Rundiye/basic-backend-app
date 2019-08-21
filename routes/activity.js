'use strict'

const express = require('express')
const Activity = require('../models/Activity')
const Day = require('../models/Day')
const Trip = require('../models/Trip')
const router = express.Router()

/* GET home page. */
// router.get('/trips', async (req, res, next) => {
//   try {
//     const listOfTrips = await Trip.find()

//     res.status(200).json({ listOfTrips })
//   } catch (error) {
//     next(error)
//   }
// })

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
  const { title, address, price, description, activityType } = req.body
  const { dayId } = req.params
  try {
    const newActivity = await Activity.create({
      title,
      address,
      price,
      description,
      activityType
    })

    const { _id } = newActivity
    const updatedDay = await Day.findByIdAndUpdate(dayId, { $push: { activities: _id } }, { new: true })
    console.log('updatedDay.trip[0]', updatedDay.trip[0])

    const updatedTrip = await Trip.findById(updatedDay.trip[0])
      .populate('totalDays')
      .populate({
        path: 'totalDays',
        populate: {
          path: 'activities'
        }
      })

    console.log('updatedTrip', updatedTrip)

    res.status(200).json(updatedTrip)
  } catch (error) {
    next(error)
  }
})

// router.get('/trips/:id/', async (req, res, next) => {
//   const { id } = req.params
//   // const singleTrip = req.body

//   try {
//     const singleTrip = await Trip.findById(id)
//     res.status(200).json(singleTrip)
//   } catch (error) {
//     next(error)
//   }
// })

router.put('/activities/:id/update', async (req, res, next) => {
  const { id } = req.params
  const activityUpdated = req.body

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

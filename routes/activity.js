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

// router.put('/trips/:id/update', async (req, res, next) => {
//   const { id } = req.params
//   const tripUpdated = req.body

//   try {
//     const updated = await Trip.findByIdAndUpdate(id, tripUpdated, { new: true })
//     res.status(200).json(updated)
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/trips/:id/delete', async (req, res, next) => {
//   const { id } = req.params

//   try {
//     await Trip.findByIdAndDelete(id)
//     res.status(200).json({ message: 'app deleted' })
//   } catch (error) {
//     next(error)
//   }
// })

// router.get('mytrips/:id/dashboard', async (req, res, next) => {
//   const { id } = req.params

//   try {
//     await Trip.findById(id)
//     res.redirect('trips/:id/dashboard')
//     res.status(200).json()
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router

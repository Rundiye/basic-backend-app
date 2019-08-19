'use strict'

const express = require('express')
const Activity = require('../models/Activity.js')
const Day = require('../models/Day')
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

router.get('/myactivities', async (req, res, next) => {
  // TO DO fix ID
  const dayId = req.params
  try {
    const listOfMyActivities = await Day.find(dayId)
    res.status(200).json({ listOfMyActivities })
  } catch (error) {
    next(error)
  }
})

router.post('/activities/new', async (req, res, next) => {
  const { title, address, price, description, activityType } = req.body

  try {
    const newActivity = await Activity.create({
      title,
      address,
      price,
      description,
      activityType
    })
    const dayId = day._id
    const activityId = activity._id
    await Day.findByIdAndUpdate(dayId, { $push: { activities: activityId } })

    res.status(200).json(newActivity)
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

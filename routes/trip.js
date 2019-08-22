'use strict'

const express = require('express')
const Trip = require('../models/Trip.js')
const User = require('../models/User')
const Day = require('../models/Day')
const router = express.Router()

router.get('/trips', async (req, res, next) => {
  try {
    const listOfTrips = await Trip.find()
    res.status(200).json({ listOfTrips })
  } catch (error) {
    next(error)
  }
})

router.get('/mytrips', async (req, res, next) => {
  const userId = req.session.currentUser._id

  try {
    const listOfMyTrips = await Trip.find({ owner: userId })
    res.status(200).json({ listOfMyTrips })
  } catch (error) {
    next(error)
  }
})

router.post('/trips/new', async (req, res, next) => {
  const { title, destination, startDate, endDate, description, budget, totalDays } = req.body
  const newEndDate = new Date(endDate)
  const newStartDate = new Date(startDate)
  const totalDaysArray = []

  for (let i = 0; i <= totalDays; i++) {
    totalDaysArray.push(i)
  }

  if (newEndDate.getTime() >= newStartDate.getTime()) {
    try {
      const owner = req.session.currentUser._id
      const trip = await Trip.create({
        title,
        destination,
        startDate,
        endDate,
        description,
        budget,
        owner
      })
      Promise.all(totalDaysArray.map(async (totalDay, index) => {
        const day = new Date(startDate)
        day.setDate(day.getDate() + index)

        const createdDay = await Day.create({
          date: day,
          activities: [],
          trip: trip._id
        })
        await Trip.findByIdAndUpdate(trip._id, { $push: { totalDays: createdDay._id } })
      })).then(async () => {
        const tripId = trip._id
        const userId = req.session.currentUser._id
        await User.findByIdAndUpdate(userId, { $push: { mytrips: tripId } })

        res.status(200).json(trip)
      })
    } catch (error) {
      next(error)
    }
  } else {
    res.status(240).json({ error: 'Invalid date' })
  }
})

router.get('/trips/:id/', async (req, res, next) => {
  const { id } = req.params

  try {
    const singleTrip = await Trip.findById(id)
      .populate('totalDays')
      .populate({
        path: 'totalDays',
        populate: {
          path: 'activities'
        }
      })
    res.status(200).json(singleTrip)
  } catch (error) {
    next(error)
  }
})

router.put('/trips/:id/update', async (req, res, next) => {
  const { id } = req.params
  const tripUpdated = req.body

  try {
    const updated = await Trip.findByIdAndUpdate(id, tripUpdated, { new: true })
    res.status(200).json(updated)
  } catch (error) {
    next(error)
  }
})

router.delete('/trips/:id/delete', async (req, res, next) => {
  const { id } = req.params

  try {
    await Trip.findByIdAndDelete(id)
    res.status(200).json({ message: 'app deleted' })
  } catch (error) {
    next(error)
  }
})

router.get('mytrips/:id/dashboard', async (req, res, next) => {
  const { id } = req.params

  try {
    await Trip.findById(id)
    res.redirect('trips/:id/dashboard')
    res.status(200).json()
  } catch (error) {
    next(error)
  }
})

module.exports = router

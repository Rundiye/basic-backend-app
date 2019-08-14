'use strict';

const express = require('express');
const Trip = require('../models/Trip.js');
const router = express.Router();

/* GET home page. */
router.get('/trips', async (req, res, next) => {
  try {
    const listOfTrips = await Trip.find();
    res.status(200).json({ listOfTrips });
  } catch (error) {
    next(error);
  }
});

router.get('/trips/:id', async (req, res, next) => {
  try {
    const singleTrip = await Trip.findOne(id);
    res.status(200).json({ singleTrip });
  } catch (error) {
    next(error);
  }
});

router.post('/trips/new', async (req, res, next) => {
  const newTrip = req.body;
  try {
    const createdTrip = await Trip.create(newTrip);
    res.status(200).json(createdTrip);
  } catch (error) {
    next(error);
  }
});

router.put('/trips/:id/update', async (req, res, next) => {
  const { id } = req.params;
  const tripUpdated = req.body;

  try {
    const updated = await Trip.findByIdAndUpdate(id, tripUpdated, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/trips/:id/delete', async (req, res, next) => {
  const { id } = req.params;

  try {
    await Trip.findByIdAndDelete(id);
    res.status(200).json({ message: 'app deleted' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

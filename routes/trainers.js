'use strict';

const express = require('express');
const User = require('../models/User');

const router = express.Router();

const {
  isLoggedIn
} = require('../helpers/middlewares');

router.get('/all', isLoggedIn(), async (req, res, next) => {
  try {
    const trainers = await User.find({ trainer: true });
    console.log(trainers);
    res.json({ trainers });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', isLoggedIn(), async (req, res, next) => {
  try {
    const id = req.params.id;
    const trainer = await User.findById(id);
    res.json({ trainer });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

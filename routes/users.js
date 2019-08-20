'use strict';

const express = require('express');
const User = require('../models/User');

const router = express.Router();

const {
  isLoggedIn
} = require('../helpers/middlewares');

router.put('/:id/update', isLoggedIn(), async (req, res, next) => {
  const { id } = req.params;
  const { name, value } = req.body;
  const newObj = { [name]: value };
  try {
    const updated = await User.findByIdAndUpdate(id, newObj, { new: true });
    req.session.currentUser = updated;
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/delete', isLoggedIn(), async (req, res, next) => {
  // delete
});

module.exports = router;

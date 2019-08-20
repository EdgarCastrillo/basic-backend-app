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

router.put('/bookmarks/:id/update', isLoggedIn(), async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const userId = req.session.currentUser._id;
    const currentBookmarks = req.session.currentUser.myBookmarks;
    console.log(currentBookmarks);
    let updatedUser;
    if (currentBookmarks.includes(id)) {
      updatedUser = await User.findByIdAndUpdate(userId, { $pull: { myBookmarks: id } }, { new: true });
    } else {
      updatedUser = await User.findByIdAndUpdate(userId, { $push: { myBookmarks: id } }, { new: true });
    }
    req.session.currentUser = updatedUser;
    res.status(200).json(id);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id/delete', isLoggedIn(), async (req, res, next) => {
  // delete
});

module.exports = router;

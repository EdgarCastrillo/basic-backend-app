'use strict';

const express = require('express');
const createError = require('http-errors');

const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');

const {
  isLoggedIn,
  isNotLoggedIn,
  validationLoggin
} = require('../helpers/middlewares');

router.get('/me', isLoggedIn(), (req, res, next) => {
  res.json(req.session.currentUser);
});

router.post(
  '/login',
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        next(createError(404));
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.status(200).json(user);
      } else {
        next(createError(401));
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/signup',
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { name, surname, email, password, country, city, academic, description, skills, train } = req.body;

    try {
      const user = await User.findOne({ email }, 'email');
      if (user) {
        return next(createError(422));
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        if (name === undefined) {
          const account = await User.create({ email, password: hashPass, trainer: false });
          console.log('sdfghjkl');
          req.session.currentUser = account;
        } else {
          const personalTrainer = await User.create({ name, surname, email, password: hashPass, country, city, academic, description, skills, train, trainer: true });
          req.session.currentUser = personalTrainer;
        }
        res.status(200).json(req.session.currentUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post('/logout', isLoggedIn(), (req, res, next) => {
  delete req.session.currentUser;
  return res.status(204).send();
});

router.get('/private', isLoggedIn(), (req, res, next) => {
  res.status(200).json({
    message: 'This is a private message'
  });
});

module.exports = router;

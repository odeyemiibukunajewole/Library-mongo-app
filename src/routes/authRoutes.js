const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');

const authRouter = express.Router();
function router() {
  authRouter.route('/signup').post((req, res) => {
    debug(req.body);
    // create user
    req.logIn(req.body, () => {
      res.redirect('/auth/profile');
    });
    // res.json(req.body);
  });
  authRouter.route('/profile').get((req, res) => {
    res.json(req.user);
  });
  return authRouter;
}

module.exports = router;

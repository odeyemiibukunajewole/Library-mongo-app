const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();
function router(nav) {
  authRouter.route('/signup').post((req, res) => {
    debug(req.params);
    const { username, password } = req.body;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';
    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected correctly to server');
        const db = client.db(dbName);
        const col = db.collection('user');
        const user = { username, password };
        const results = await col.insertOne(user);
        debug(results);
        req.logIn(results.ops[0], () => {
          res.redirect('/auth/profile');
        });
      } catch (err) {
        debug(err);
      }
    }());
    debug(req.body);
    // create user
    // res.json(req.body);
  });
  authRouter.route('/signin').get((req, res) => {
    res.render('signin', {
      nav,
      title: 'Sign In'
    });
  })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));
  authRouter.route('/profile').all((req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect('/');
    }
  })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;

const express = require('express');
// const { MongoClient, ObjectID } = require('mongodb');
// const debug = require('debug')('app:adminRoutes');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();

function router(nav) {
  const { getIndex, getByID } = bookController(nav);
  bookRouter.use((req, res, next) => {
    // if (req.user) {
    next();
    // } else {
    //   res.redirect('/');
    // }
  });
  bookRouter.route('/').get(getIndex);
  bookRouter.route('/:id').get(getByID);
  return bookRouter;
}


module.exports = router;

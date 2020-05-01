const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const books = [{
  author: 'Chinua Acheber',
  title: 'Things Fall Aparts',
  read: false
},
{
  author: 'Hans Christian Andersene',
  title: 'Fairy talese',
  read: false
},
{
  author: 'Dante Alighierie',
  title: 'The Divine Comedys',
  read: false,
},
{
  author: 'Jane Austen',
  title: 'Pride and Prejudice',
  read: false,
},
{
  author: 'Samuel Beckett',
  title: 'Molloy, Malone Dies, The Unnamable, the trilogy',
  read: false
},
{
  author: 'Ralph Ellison',
  title: 'Invisible Man',
  read: false
},
{
  author: 'Euripides',
  title: 'Medea',
  read: false
},
{
  author: 'William Faulkner',
  title: 'The Sound and the Fury',
  read: false
},
{
  author: 'Gustave Flaubert',
  title: 'Madame Bovary',
  read: false
}
];
function router(nav) {
  adminRouter.route('/').get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('connected');
        const db = client.db(dbName);
        const Response = await db.collection('books').insertMany(books);
        res.json(Response);
      } catch (error) {
        debug(error.stack);
      }
      client.close();
    }());
  });
  return adminRouter;
}

module.exports = router;




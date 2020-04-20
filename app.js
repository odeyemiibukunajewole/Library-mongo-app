const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app:app');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  { link: '/books', title: 'Books' },
  { link: 'author', title: 'Author' }
];
const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.get('/', (req, res) => {
  res.render('index',
    {
      title: 'Library',
      nav: [{ link: '/books', title: 'Books' },
        {
          link: 'author', title: 'Author'
        }]
    });

  // res.sendFile(path.join(__dirname, '/views/', '/index.html'));
  // res.send('hello')
  debug(`app running on port ${chalk.green(port)}`);
});

app.listen(port, () => {
  // console.log(pathq)
  debug(`app running on port ${chalk.green(port)} ${__dirname}`);
});

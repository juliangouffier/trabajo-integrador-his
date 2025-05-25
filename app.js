var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var authRouter = require('./routes/auth')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const PORT = process.env.PORT || 3001;
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', authRouter);
app.use('/', indexRouter);

//app.use('/home', indexRouter);
app.use('/', usersRouter);

/*app.use(function(req, res, next) {
  next(createError(404));
});*/

/*pp.use((req, res) => {
  res.redirect('/');
});*/


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});


const db = require('./models');

db.sequelize.sync()
  .then(() => {
    console.log('Base de datos conectada y sincronizada');
    app.listen(PORT, () => console.log('Servidor corriendo en puerto ' + PORT));
  })
  .catch((err) => {
    console.error('Error al conectar DB', err);
  });

module.exports = app;

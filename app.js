var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users'); */

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'fe', 'dist')));

app.use('/api', require('./routes/api'));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const mongoose = require('mongoose')
const User = require('./models/users')

/* const userSchema = new mongoose.Schema({
  name: { type: String, default: '', unique: true, index: true },
  age: { type: Number, default: 1 }
})

const User = mongoose.model('User', userSchema) */

mongoose.connect('mongodb://localhost:27017/gsm', { useNewUrlParser: true }, (err) => {
  if (err) return console.error(err)
  console.log('mongoose connected!')

  User.create({ 'name': '하하' })
    .then(r => console.log(r))
    .catch(e => console.error(e))
  
  /* User.updateOne({_id: '5cbd2077559aefbe6c05d006'}, {$set: {age:27}})
  .then(r=>{
    console.log(r)
    console.log('updated')
    return User.find()
  })
    .then(r => console.log(r))
    .catch(e => console.error(e)) */

  /* User.deleteOne({name: '하하'})
  .then(r=> console.log(r))
  .catch(e=> console.error(e)) */
})

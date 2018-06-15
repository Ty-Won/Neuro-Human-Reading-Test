var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var helmet = require('helmet');




var app = express();
app.use(helmet());

// view engine setup and views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// setup the public folder directory for static files (css,js,img)
app.use(express.static(path.join(__dirname, 'public')));

//Setting up the routes to redirect between pages
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var trialRouter = require('./routes/trial');
app.use('/', indexRouter);
app.use('/trial', trialRouter);
app.use('/admin', adminRouter);


//DB connection
mongoose.connect("mongodb://localhost:27017/tyroneTestDbs");
mongoose.Promise=global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log("Connected to MongoDB");
});

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

app.listen(8000, function () {
    console.log("Running on local host 8000");
});
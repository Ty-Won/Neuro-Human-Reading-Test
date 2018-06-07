var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var mongo = require('mongodb');
var mongoose = require('mongoose');
var helmet = require('helmet');
var bcrypt = require('bcrypt');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var trialRouter = require('./routes/trial');
var app = express();
app.use(helmet());

// view engine setup and views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// setup the public folder directory for static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/trial', trialRouter);
app.use('/users', usersRouter);


//DB connection
mongoose.connect("mongodb://localhost:27017/test1");
mongoose.Promise=global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log("Connected to MongoDB");
});
var userSchema = new mongoose.Schema({
    "first-name": {type: String, required: true},
    "last-name": {type: String, required: true},
    "email": {type: String, required: true, unique: true},
    "password": {type: String, required: true},
    "birthdate":{type:Date, required: true},
    "simulation": []
});


// app.post('/', (req, res) => {
//     console.log("goes here");
//     var data = new User(req.body);
//     data.save()
//         .then(item => {
//             res.send("Submission Successful");
//         })
//         .catch(err => {
//             res.status(400).send("Error Can't submit data");
//         });
//     return true;
// });





app.post('/signIn', (req, res) => {
    var data = new User(req.body);
    User.findOne({email:new RegExp('^'+data.email+'$')},function(err, User){
        if(err){
            console.log("Error");
        }
        else if(User && (User.password)===(req.body.password)){
            console.log("Found");
        }
        else{
            console.log("Unsuccessful Sign-in");
        }
    });

});


app.post('/signUp', (req, res) => {

    var data = new User(req.body);
    data.save(function(err, data){
        if(err) {
            return console.error("Error signing up:" + err);
        }
        else{
            return console("Success");
        }
    });

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
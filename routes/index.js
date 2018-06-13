var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('../models/user');
var bcrypt = require('bcrypt');


//router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.post('/signIn', function (req, res) {
    var data = new User(req.body);


    User.findOne({email: new RegExp('^' + data.email + '$')}, function (err, User) {
        if (err) {
            console.log("Error");
        }
        else if (User && bcrypt.compare(req.body.password, User.password)) {

            res.redirect("/trial/" + User.id);


        }
        else {
            console.log("Unsuccessful Sign-in");
        }
    });

});


router.post('/signUp', function (req, res) {
    var rounds = 10;

    bcrypt.hash(req.body.password, rounds, function (err, hash) {
        //error handle insert here......*******************
        req.body.password = hash;
        var data = new User(req.body);
        data.save(function (err, User) {
            if (err) {
                console.log("Error signing up:" + err);
            }
            else {
                console.log("Found");
                res.redirect("/trial/" + User.id);
            }
        });
    });


});

module.exports = router;

var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var bcrypt = require('bcrypt');
var User = require('../models/user');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/**
 * Handles post requests for sign in from the index page and uses the bcrypt module for
 * password encryption
 */
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


/**
 * Handler for sign up requests from the index page, encrypts password using bcrypt and stores in
 * Mongo
 */
router.post('/signUp', function (req, res) {
    var rounds = 10;

    bcrypt.hash(req.body.password, rounds, function (err, hash) {
        if(err){
            console.log("Error with password format or hashing:" + hash);
        }
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

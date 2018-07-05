var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var bcrypt = require('bcrypt');
var User = require('../models/user');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Neuro Human Reading Trial'});
});

/**
 * Handles post requests for sign in from the index page and uses the bcrypt module for
 * password encryption
 */

router.post('/signIn', function (req, res) {
    var response;
    var data = new User(req.body);
    var queryResult = User.findOne({email: new RegExp('^' + data.email + '$')}).exec();

    // , function (err, User) {
    //     if (err) {
    //         console.log("Error Signing In: " + err);
    //         response = {
    //             status: 404
    //         };
    //         res.writeHead(response.status);
    //         res.end(JSON.stringify(response));
    //
    //     }
    //     else if (User) {        }
    // });

    queryResult.then(function (userFound) {
        if (!userFound) {
            response = {
                status: 401
            };
            res.writeHead(response.status);
            res.end(JSON.stringify(response));
            console.log("User does not exist: " + err);
        }
        else {
            bcrypt.compare(req.body.password, userFound.password, function (err, match) {
                if (err) {
                    response = {
                        status: 500
                    };
                    res.writeHead(response.status);
                    console.log("Error with bcrypt comparison");
                    res.end(JSON.stringify(response));

                } else if (match) {
                    console.log("Successful Sign-In");
                    response = {
                        status: 200,
                        id: userFound.id
                    };
                    res.writeHead(response.status);
                    res.end(JSON.stringify(response));
                }
                else {
                    response = {
                        status: 401
                    };
                    res.writeHead(response.status);
                    res.end(JSON.stringify(response));
                    console.log("Wrong Credentials: " + err);
                }

            });
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
        if (err) {
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

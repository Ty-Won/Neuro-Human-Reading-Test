var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var User = require("../models/user");


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/signIn', function(req, res) {
    var data = new User(req.body);
    User.findOne({email:new RegExp('^'+data.email+'$')},function(err, User){
        if(err){
            console.log("Error");
        }
        else if(User && (User.password)===(req.body.password)){
            console.log("Found");
            res.redirect("../trial");

        }
        else{
            console.log("Unsuccessful Sign-in");
        }
    });

});


router.post('/signUp', function(req, res) {

    var data = new User(req.body);
    data.save(function(err, data){
        if(err) {
            console.log("Error signing up:" + err);
        }
        else{
            res.redirect('../trial');
            res.render('VisualTrial', { data: data });
        }
    });

});

module.exports = router;

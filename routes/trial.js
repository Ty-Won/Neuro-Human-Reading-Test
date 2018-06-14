var express = require("express");
var router = express.Router();
var User = require('../models/user');
var bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get('/:id',function(req,res){
    User.findById(req.params.id,function(err, userFound){
        if(err){
            console.log("An error occured while redirecting after signing in"+err);
        }
        else if(userFound){
            res.render('visualTrial',{User:userFound.firstName,Trial:userFound.session,runSelection:0});
        }
        else{
            console.log("Unsuccessful Sign-in");
        }
    });
});


router.put('/:id/save',function(req,res){
    User.findById(req.params.id,function(err,userFound){
        if(err){
            console.log("An error occurred while saving the current trial session"+err);
        }
        else if(userFound){
            userFound.session=req.body;
            userFound.save(function(err,updatedUser){
                if(err){
                    console.log("An error occured while saving the new run data to the current user session"+err);
                }
                else if(updatedUser){
                    console.log("Trial has been Saved");
                }
            });

        }
    })

});

router.put("/:id/submit",function(req,res){
    User.findById(req.params.id,function(err,userFound){
        if(err){
            console.log("An error occurred while finding the current user to submit under"+err);
        }
        else if(userFound){
            userFound.session=req.body;
            userFound.save(function(err,submitUser){
                if(err){
                    console.log("An error occurred while submitting for the current user session"+err);
                }
                else if(submitUser){
                    console.log("WOOT");
                    res.redirect("../../");
                }
            });

        }
    })

});


module.exports=router;
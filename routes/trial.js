var express = require("express");
var router = express.Router();
var User = require('../models/user');
var bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));


/**
 * Receive the userID and render the trial
 */
router.get('/:id',function(req,res){
    User.findById(req.params.id,function(err, userFound){
        if(err){
            console.log("An error occurred while redirecting after signing in: "+err);
        }
        else if(userFound){
            // res.render('visualTrial',{User:userFound.firstName,Trial:userFound.session,runSelection:JSON.parse(userFound.session).length-1});
            res.render('jspsychDemo',{User:userFound.firstName,Session:userFound.session});
        }
        else{
            console.log("Unsuccessful Sign-in");
        }
    });
});



/**
 * Receive an ajax request to save the current trial state under the current userID profile
 */


router.put('/:id/save',function(req,res){
    User.findByIdAndUpdate({_id:req.params.id},req.body,function(err,userUpdated){
        if(err){
            console.log("error"+err);
        }
        else if(userUpdated) {
            var response = {
                status  : 200,
                success : 'New added!'
            };
            res.end(JSON.stringify(response));
        }
    })
});



router.put("/:id/submit",function(req,res){
    User.findByIdAndUpdate({_id:req.params.id},req.body,function(err,userUpdated){
        if(err){
            console.log("error"+err);
        }
        else if(userUpdated) {
                    var response = {
                        status  : 200,
                        success : 'Successfully submitted trial!'
                    };
                    res.end(JSON.stringify(response))
                }
            });

    });




module.exports=router;
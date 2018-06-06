var express = require("express");
var router = express.Router();

router.get('/',function(req,res,next){
    res.render('visualTrial',{title:'Trial'});
});

module.exports=router;
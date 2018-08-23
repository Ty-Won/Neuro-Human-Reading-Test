var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var userSchema = new Schema({
    "firstName": {type: String, required: true},
    "lastName": {type: String, required: true},
    "email": {type: String, required: true, unique: true},
    "password": {type: String, required: true},
    "birthdate": {type: Date, required: true},
    "session": []
});

// "block_1":{
//     "trial_1":{
//         "condition":{type:Number},
//
//     }
// }


var User = mongoose.model("user_profiles", userSchema);

module.exports = User;
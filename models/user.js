var mongoose= require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    "first-name": {type: String, required: true},
    "last-name": {type: String, required: true},
    "email": {type: String, required: true, unique: true},
    "password": {type: String, required: true},
    "birthdate":{type:Date, required: true},
    "run": []
});

var User = mongoose.model("user_profiles", userSchema);

module.exports = User;
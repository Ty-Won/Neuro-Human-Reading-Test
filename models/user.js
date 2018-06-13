var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var trials = new Schema({
    "color": {type: String, default: "here"}
}, {_id: false});

var blocks = new Schema({

    "trials": [trials]

}, {_id: false});

var run = new Schema({
    "blocks": [blocks]
}, {_id: false});

var userSchema = new Schema({
    "firstName": {type: String, required: true},
    "lastName": {type: String, required: true},
    "email": {type: String, required: true, unique: true},
    "password": {type: String, required: true},
    "birthdate": {type: Date, required: true},
    "session": {
        type: [run], default: [{
            "blocks": [{
                "trials": [{
                    "color": null
                }]
            }]
        }, {
            "blocks": [{
                "trials": [{
                    "color": null
                }]
            }]
        }]
    }

});

var User = mongoose.model("user_profiles", userSchema);

module.exports = User;
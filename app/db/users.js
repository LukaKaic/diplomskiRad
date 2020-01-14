var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    profileId : {type : String, default: ""},
    fullName : {type : String, default: ""},
    profilePic : {type : String, default: ""},
    userRating : {type : Number, default : 0},
    email: {
        type: String,
        unique: true,
        trim: true,
        default : ""
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
});


module.exports = mongoose.model('User', userSchema);



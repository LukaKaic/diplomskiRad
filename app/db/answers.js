var mongoose = require('mongoose');

var answersSchema = new mongoose.Schema({
    answerText : {type : String},
    answerResult : {type : Number},
    answerId : {type : Number}
});


module.exports = mongoose.model('Answer', answersSchema);



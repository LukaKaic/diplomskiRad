var mongoose = require('mongoose');

var questionSchema = new mongoose.Schema({
    questionText : {type : String},
    answers: [{
        answerText : {type : String},
        answerResult : {type : Number},
        answerId : {type : Number},
    }],
    questionExplanation : {type : String},
    switchToSecondPart: {type : String, default : "False"}
});

module.exports = mongoose.model('Question', questionSchema);


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var questionSchema = new mongoose.Schema({
//     questionText : {type : String},
//     answers: [{
//         type: Schema.Types.ObjectId,
//         ref: 'Answer'
//     }]
// });
var questionSchema = new mongoose.Schema({
    questionText : {type : String},
    answers: [{
        answerText : {type : String},
        answerResult : {type : Number},
        answerId : {type : Number}
    }]
});

module.exports = mongoose.model('Question', questionSchema);


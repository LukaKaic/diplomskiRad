var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.insertQuestion = function (req, res) {
    checkNumberOfQuestions();

    Question.find({}, function result (err, result) {
        var lengthData = result.length;
    });

    // console.log("broj" + numOfQuestions);
    var questionTextVar = req.body.questionText;
    // var questionId = numOfQuestions + 1;
    var answersVar;
    var answersAll = [];
    for(var i= 0; i < req.body.answers.length; i++){
        var answerText = req.body.answers[i].answerText;
        var answerResult = req.body.answers[i].answerResult;
        answersVar = {
            answerText : answerText,
            answerResult : answerResult,
            answerId : i+1
        };
        answersAll.push(answersVar);
        console.log(answersVar);
    }
    var test = req.body.answers.length;
    console.log(answersAll);
    console.log(test);
    Question.create({

        questionText : questionTextVar,
        questionId : req.body.questionId,
        answers: answersAll

    }, function (err, question) {
        if(err){
            sendJSONresponse(res, 404, err);
        }
        else{
            sendJSONresponse(res, 200, question);
        }

    });
};

function checkNumberOfQuestions(){




};


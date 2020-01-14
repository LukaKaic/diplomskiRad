var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
var h = require('../helpers/index');

const db = require('../db/index');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports = {


    getQuiz: (req, res) => {
        "use strict";

        let userId = req.body.userId;
        console.log(userId);
        let counter = req.body.counter;

        Question.find({}, function (err, result) {
            if (err) return handleError(err);
            console.log(result);
            let numOfQuestions = result.length;
            console.log(numOfQuestions);
            res.send({
                result : result[counter]
            });
        })

        // db.collection("questions").find(query).toArray(function (err, result) {
        //     if (err) throw err;
        //     console.log(result);
        //     res.render('home.ejs', {
        //         quiz:quiz
        //     })
        // });
    },

    // getQuizById : (req, res) => {
    //     "use strict";
    //     var userRating = req.query.result;
    //
    //     console.log(req.query.result);
    //     console.log(req.session);
    //     console.log(req.query.Id);
    //     Question.find({'questionId' : req.params.id}, function (err, question) {
    //         // User.find({'_id' : req.query.Id}, function (err, user) {
    //         //     console.log("found this" + user[0].userRating);
    //         //     // res.render('quiz.ejs', {
    //         //     //     quiz:question,
    //         //     //     user : user[0],
    //         //     //     message: 0
    //         //     // })
    //         //     res.send(result)
    //         // })
    //         res.send(question)
    //     });
    //
    //     //dodaje bodove (preko fejsa nade userId)
    //     // User.find({'_id' : req.query.Id}, function (err, user) {
    //     //     let userRatingNew = Number (user[0].userRating);
    //     //     userRatingNew = Number(user[0].userRating) + Number(userRating);
    //     //     User.updateOne(
    //     //         {}, // Filter
    //     //         {"userRating": userRatingNew}// Update
    //     //     ) .then((obj) => {
    //     //         console.log('Updated - ' + obj);
    //     //     })
    //     //         .catch((err) => {
    //     //             console.log('Error: ' + err);
    //     //         });
    //     // })
    // },

    resetScore : (req, res, next) => {
        "use strict";
        console.log("kopristim rutu resertScore");
        console.log(req.body.userId); //userId da nadem usera kojem updateam score
        User.find({'_id' : req.body.userId}, function (err, user) {
            let reset = 0;
            User.updateOne(
                {}, // Filter
                {"userRating": reset}// Update
            ) .then((obj) => {
                console.log('Updated - ' + obj);
                res.status(200).send((0).toString());
            })
                .catch((err) => {
                    console.log('Error: ' + err);
                });
        })

    },

    updateScore : (req, res, next) => {
        "use strict";
        console.log(req.body.userId); //userId da nadem usera kojem updateam score
        console.log(req.body.answerScore); //answerScore koji dodajem
        User.find({'_id' : req.body.userId}, function (err, user) {
            let userScore = Number (user[0].userRating);
            userScore = Number(user[0].userRating) + Number(req.body.answerScore);
            User.updateOne(
                {}, // Filter
                {"userRating": userScore}// Update
            ) .then((obj) => {
                console.log('Updated - ' + obj);
                res.status(200).send((userScore).toString());
            })
                .catch((err) => {
                    console.log('Error: ' + err);
                });
        })

    },

    checkScore : (req, res, next) => {
        "use strict";
        console.log(req.body.userId); //userId da nadem usera kojem updateam score
        User.find({'_id' : req.body.userId}, function (err, user) {
            res.status(200).send((user[0].userRating).toString());
        })

    },

    checkAnswer : (req, res, next) => {
        "use strict";
        //provjeri koliko bodova nosi odgovor
        console.log(req.body.questionId);
        let answerId  = req.body.answerId;

        Question.find({'_id' : req.body.questionId}, function (err, result) {
            if (err) return handleError(err);
            console.log();
            for ( let i = 0 ; i < result[0].answers.length  ; i ++ ) {
                console.log(result[0].answers[i].answerId + " : " + answerId);
                if(answerId == result[0].answers[i].answerId){
                    console.log("result is" + result[0].answers[i].answerResult);
                    res.status(200).send((result[0].answers[i].answerResult).toString());
                }
            }
        })

    }
};

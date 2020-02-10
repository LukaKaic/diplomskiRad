var express = require('express');
var router = express.Router();
var path = require("path");
const h = require('../helpers');
const passport = require('passport');
const config = require('../config');
var controllerAdmin = require('../controllers/controllerAdmin');
var controllerMain = require('../controllers/controllerMain');
var mongoose = require('mongoose');
var User = mongoose.model('User');


/* GET home page. */

router.get('/', function (req, res, next) {
    res.render('landing');
});


router.get('/home', function (req, res, next) {
    res.render('home', {
        user: req.user
    });
});

router.get('/newGame', function (req, res, next) {

    User.findOne({email: req.body.email})
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (user) {
                console.log(user);
                res.render('home', {
                    user: user
                })
            }
        })

});

router.post('/home', function (req, res, next) {


    var userData = {
        email: req.body.email,
        password: req.body.password,
    };

    console.log(req.body.email);


    User.findOne({email: req.body.email})
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } else if (user) {
                console.log(user);
                if(req.body.password == user.password){
                    res.render('home', {
                        user:user
                    })
                } else {
                    res.redirect('/')
                }

            } else {
                res.redirect('/')
            }

        })

});

router.post('/resetScore', controllerMain.resetScore);
router.post('/updateScore', controllerMain.updateScore);
router.post('/checkScore', controllerMain.checkScore);
router.post('/checkAnswer', controllerMain.checkAnswer);

router.post('/quiz', controllerMain.getQuiz);
// router.get('/quiz/:id', controllerMain.getQuizById);
router.get('/admin', function (req, res) {
   res.render('addQuestionsAnswers.ejs');
});
router.post('/admin', controllerAdmin.insertQuestion);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/profile', function (req, res) {
    res.render('profile', {
        user: req.user
    });
});

router.post('/register', function (req, res, next) {
    if (req.body.email &&
        req.body.username &&
        req.body.password) {

        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            fullName: req.body.username
        };



        User.create(userData, function (err, user) {
            if (err) {
                return next(err);
            } else {
                res.render('home', {
                    user : user
                })
            }
        });
    }
});

router.post('/login', function (req, res, next) {

    var userData = {
        email: req.body.email,
        password: req.body.password,
    };

    console.log(req.body.email);

        User.findOne({email: req.body.email})
            .exec(function (err, user) {
                if (err) {
                    return callback(err)
                } else if (user) {
                    console.log(user);
                    res.render('home', {
                        user:user
                    })
                }

            })
});


router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/home',
        failureRedirect: '/'
    }));

// function requiresLogin(req, res, next) {
//     if (req.session.userId) {
//         return next();
//     } else {
//         var err = new Error('You must be logged in to view this page.');
//         err.status = 401;
//         return next(err);
//     }
// }
module.exports = router;

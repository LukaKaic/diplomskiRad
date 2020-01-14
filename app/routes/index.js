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
    res.render('index');
});

router.get('/getsession', function (req, res, next) {
    res.send('my favourite color ' + req.session.favcolor);
});

router.get('/setsession', function (req, res, next) {
    req.session.favcolor = "Red";
    res.send("Session set");
});

router.get('/home', [h.isAuthenticated], function (req, res, next) {
    res.render('home', {
        user: req.user
    });
});

router.post('/resetScore', [h.isAuthenticated], controllerMain.resetScore);
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
            passwordConf: req.body.passwordConf,
        };


        User.create(userData, function (err, user) {
            if (err) {
                return next(err);
            } else {
                console.log(user._id);
                res.render('quiz.ejs', {
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
                    res.render('template.ejs', {
                        user: user
                    })

                }
            })
})

router.get('/login', function(req, res, next) {
    var user = {name:'test'}; //!! find the user and check user from db then

    var token = jwt.sign(user, 'secret', {
        expiresInMinutes: 1440
    });

    res.cookie('auth',token);
    res.send('ok');

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

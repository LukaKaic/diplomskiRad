// 'use strict';
const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const favicon = require('serve-favicon');
const passport = require('passport');
const session = require('express-session');
const quiz = require('./app');

app.use(quiz.session);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend : false}));
require('./app/auth')(passport);
require('./app/db/index');

//
var routesApi = require('./app/routes/index');
//
//

app.use(require('cookie-parser')());
// app.use(session({ secret: 'keyboard cat', key: 'sid'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', 'localhost');
    next();
});

//
app.use(bodyParser.json({extend : false}));
app.use(bodyParser.urlencoded({extend : false}));
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/', routesApi);
//
//
//
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});
//
// var server=http.createServer(function(req,res){
//     res.end('test');
// });
//
// server.on('listening',function(){
//     console.log('ok, server is running');
// });
//
// server.listen(3000);

module.exports = {
    server : server
};
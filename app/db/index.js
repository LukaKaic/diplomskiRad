var mongoose = require('mongoose');
require('./users');
require('./answers');
require('./questions');

var dbURI = 'mongodb://root:rootuser1@ds063168.mlab.com:63168/diplomskirad';

mongoose.connect(dbURI);


mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error ' + err);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected');
});

var shutdownDB = function(msg, callback){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// For nodemon restarts
process.once('SIGUSR2', function(){
    shutdownDB('nodemon restart', function(){
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', function(){
    shutdownDB('app termination', function(){
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', function(){
    shutdownDB('Heroku app shutdown', function(){
        process.exit(0);
    });
});



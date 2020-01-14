'use strict';
const router = require('express').Router();
const db = require('../db/users');

// Find a single user based on a key
let findOne = profileID => {
    return db.findOne({
        'profileId': profileID
    });
};

// Create a new user and returns that instance
let createNewUser = profile => {
    return new Promise((resolve, reject) => {
        let newUser = new db({
            profileId: profile.id,
            fullName: profile.displayName,
            profilePic: profile.photos[0].value || ''
        });
        console.log('NewUser' + newUser);

        newUser.save(error => {
            if(error) {
                reject(error);
            } else {
                resolve(newUser);
            }
        });
    });
};

// The ES6 promisified version of findById
let findById = id => {
    return new Promise((resolve, reject) => {
        db.findById(id, (error, user) => {
            if(error) {
                reject(error);
            } else {
                resolve(user);
            }
        });
    });
}

// A middleware that checks to see if the user is authenticated & logged in
let isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/');
    }
};


module.exports = {
    findOne,
    createNewUser,
    findById,
    isAuthenticated
};
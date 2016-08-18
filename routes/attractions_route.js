var express = require('express');
var bluebird = require('bluebird');
var router = express.Router();
// var sequelize = require('sequelize');
// var db = require('../models');
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var Place = require('../models/place');
var Day = require('../models/day');

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

Day.belongsTo(Hotel);
Day.belongsToMany(Restaurant, {through: 'day_restaurant'});
Day.belongsToMany(Activity, {through: 'day_activity'});

// router.get('/day', function(req, res, next) {

//     Hotel.findAll()
//         .then(function(hotels) {
//             res.json(hotels);
//         })
//         .catch(next);
// });

router.get('/hotels', function(req, res, next) {

    Hotel.findAll()
        .then(function(hotels) {
            res.json(hotels);
        })
        .catch(next);
});

router.get('/restaurants', function(req, res, next) {
    Restaurant.findAll()
        .then(function(restaurants) {
            res.json(restaurants);
        })
        .catch(next);
});

router.get('/activities', function(req, res, next) {
    Activity.findAll()
        .then(function(activities) {
            res.json(activities);
        })
        .catch(next);
});

module.exports = router;
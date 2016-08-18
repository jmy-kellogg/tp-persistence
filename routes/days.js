var express = require('express');
var bluebird = require('bluebird');
var sequelize = require('sequelize');
var router = express.Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var Place = require('../models/place');
var Day = require('../models/day');

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

Day.belongsTo(Hotel);
Day.belongsToMany(Restaurant, {
    through: 'day_restaurant'
});
Day.belongsToMany(Activity, {
    through: 'day_activity'
});

router.get('/(:id)?', function(req, res, next) {
    if (!req.params.id) {
        Day.findAll()
            .then(function(days) {
                res.json(days);
            })
            .catch(next);
    } else {
        Day.findOne()
            .then(function(day) {
                res.json(day);
            })
            .catch(next);
    }
});

router.put('/', function(req, res, next) {

});

router.post('/', function(req, res, next) {
    Day.findAll({
        attributes: [
            [sequelize.fn('COUNT', sequelize.col('id')), 'num_days']
        ]
    }).then(function(count) {
        var newDayNum = +count[0].dataValues.num_days + 1;
        console.log(count[0].dataValues.num_days);
        return Day.create({
            number: newDayNum
        });
    }).then(function(day) {
        res.json(day);
    })
        .catch(next);

});

router.delete('/(:id)?', function(req, res, next) {
    var options = req.params.id ? 
        {where: {number: req.params.id}}
        : {truncate: true};

    Day.destroy(options)
        .then(function() {
            res.send('Gone');
        })
        .catch(function(err) {
            console.log(err);
        });
});

module.exports = router;
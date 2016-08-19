'use strict';

var hotels, restaurants, activities, allDays;

var varPromise = Promise.all([$.get('/api/hotels'), $.get('/api/restaurants'), $.get('/api/activities'), $.get('/api/days')])
    .then(function(dbVars) {
        hotels = dbVars[0];
        restaurants = dbVars[1];
        activities = dbVars[2];
        allDays = dbVars[3];

    })
    .catch(function(err) {
        console.log(err);
    });
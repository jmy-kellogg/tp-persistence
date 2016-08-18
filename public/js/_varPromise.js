'use strict';

var hotels, restaurants, activities;

var varPromise = Promise.all([$.get('/api/hotels'), $.get('/api/restaurants'), $.get('/api/activities')])
    .then(function(dbVars) {
        hotels = dbVars[0];
        restaurants = dbVars[1];
        activities = dbVars[2];

    })
    .catch(function(err) {
        console.log(err);
    });
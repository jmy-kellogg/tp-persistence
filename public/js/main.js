'use strict';
varPromise.then(function() {

    $(tripModule.load);


    $.get('/api/days')
        .then(function(_days) {
            _days.forEach(function(day, index) {
                var newDay = dayModule.create(day);
                if (index === _days.length - 1) tripModule.switchTo(newDay);
            });
        })
        .catch(console.log);


});
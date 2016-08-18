'use strict';
varPromise.then(function() {

    $(tripModule.load);


    $.get('/api/days')
        .then(function(_days) {
            _days.forEach(function(day) {
                var newDay = dayModule.create(day);
                newDay.show();
            });
        })
        .catch(console.log);


});
/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');

var Day = db.define('day', {
    number: Sequelize.INTEGER,
}, {
	hooks: {
		beforeDestroy: function(days) {
			Day.findAll({
				where: {
					id: {
						$gt: this.id
					}
				}
			})
			.then(function(days) {
				days.forEach(day => day.updateAttributes({
					number: day.number - 1
				}));
			})
			.catch(console.log);
		}
	}
});

module.exports = Day;
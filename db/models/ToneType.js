'use strict';

const {ENUM} = require('sequelize');

module.exports = db => db.define('toneType', {
	language: {
		type: ENUM('thai','chinese','vietnamese','hmong'),
		allowNull: false
	},
	tone: {
		type: ENUM('high', 'mid', 'low', 'falling', 'rising', 'dipping', 'peaking'),
		allowNull: false
	}
});

module.exports.associations = (ToneType, {UserTone, Target}) => {
	ToneType.belongsToMany(UserTone)
	ToneType.belongsToMany(Target)
};

'use strict';

const {ARRAY, INTEGER, BLOB} = require('sequelize');

module.exports = db => db.define('UserTone', {
	pitches: {
		type: ARRAY(INTEGER),
		allowNull: false
	},
	wavblob: {
		type: BLOB,
		allowNull: false
	}
});

module.exports.associations = (UserTone, {User, ToneType}) => {
	UserTone.belongsTo(User);
	UserTone.belongsTo(ToneType);
}
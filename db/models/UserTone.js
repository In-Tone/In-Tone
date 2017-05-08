'use strict';

const {ARRAY, INTEGER, BLOB} = require('sequelize');
const db = require('../db');

const UserTone = db.define('UserTone', => {
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
	UserTones.belongsTo(User);
	UserTones.belongsTo(ToneType);
}
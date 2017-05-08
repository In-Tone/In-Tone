'use strict';

const {ARRAY, INTEGER, BLOB} = require('sequelize');
const db = require('../db');

const UserTones = db.define('UserTone', => {
	pitches: {
		type: ARRAY(INTEGER),
		allowNull: false
	},
	wavblob: {
		type: BLOB,
		allowNull: false
	}
});

module.exports.associations = (UserTones, {Users, ToneTypes}) => {
	UserTones.belongsTo(Users);
	UserTones.belongsTo(ToneTypes);
}
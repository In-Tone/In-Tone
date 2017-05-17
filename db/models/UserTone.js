'use strict';

const { ARRAY, INTEGER, TEXT, STRING, JSON, ENUM, BOOLEAN } = require('sequelize');

module.exports = db => db.define('UserTone', {
	pitches: {
		type: ARRAY(INTEGER),
	},
	wavblob: {
		type: JSON,
	},
	isBest: {
		type: BOOLEAN,
		allowNull: false
	},
	score: {
		type: INTEGER,
		allowNull: false
	},
	difficulty: {
		type: ENUM('beginner', 'amatuer', 'intermediate', 'pro', 'master'),
		allowNull: false
	},
	user_id: {
		type: INTEGER,
		allowNull: false
	},
	tone_type_id: {
		type: INTEGER,
		allowNull: false
	},
	target_id: {
		type: INTEGER,
		allowNull: false
	}
});

module.exports.associations = (UserTone, { User, ToneType, Target }) => {
	UserTone.belongsTo(User);
	UserTone.belongsTo(ToneType);
	UserTone.belongsTo(Target);
}
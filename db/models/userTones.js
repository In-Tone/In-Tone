'use strict'

const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('userTone', {
	tone: {
		type: Sequelize.STRING,
	},
	data: {
		type: Sequelize.ARRAY(Sequelize.FLOAT)
	}
})

module.exports.associations = (UserTone, {User}) => {
	UserTone.belongsTo(User)
}

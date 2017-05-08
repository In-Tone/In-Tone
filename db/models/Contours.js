'use strict'

const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('contours', {
	category: {
		type: Sequelize.STRING,
	},
	data: {
		type: Sequelize.ARRAY(Sequelize.FLOAT)
	}
})

module.exports.associations = (Contour, {User}) => {
	Contour.belongsTo(User)
}
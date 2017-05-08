const Sequelize = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash');

const db = require('../db');

module.exports = db.define('user', {
	email: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	},
	salt: {
		type: Sequelize.STRING
	},
	username: {
		type: Sequelize.STRING
	}
}, {
	instanceMethods: {
		sanitize: function () {
			return _.omit(this.toJSON(), ['password', 'salt']);
		},
		hasMatchingPassword: function(candidatePassword) {
			return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
		}
	},
	classMethods: {
		generateSalt: function () {
			return crypto.randomBytes(16).toString('base64');
		},
		encryptPassword: function(plainText, salt) {
			const hash = crypto.createHash('sha1');
			hash.update(plainText);
			hash.update(salt);
			return hash.digest('hex');
		}
	},
	hooks: {
		beforeCreate: setSaltAndPassword,
		beforeUpdate: setSaltAndPassword
	}
});

function setSaltAndPassword (user) {
	if (user.changed('password')) {
		user.salt = user.Model.generateSalt();
		user.password = user.Model.encryptPassword(user.password, user.salt);
	}
}

module.exports.associations = (User, {UserTone}) => {
	User.hasMany(UserTone, {through: 'userTones'})
}

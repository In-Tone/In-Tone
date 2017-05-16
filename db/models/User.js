'use strict';

const { STRING, INTEGER } = require('sequelize');
const crypto = require('crypto');
const _ = require('lodash');

module.exports = db => db.define('user', {
	email: {
		type: STRING,
		unique: true,
		allowNull: false
	},
	password: {
		type: STRING,
		allowNull: false
	},
	salt: {
		type: STRING
	},
	username: {
		type: STRING,
		allowNull: false
	},
	rank: {
		type: INTEGER,
		allowNull: false
	},
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
	User.hasMany(UserTone)
}

'use strict';

const Sequelize = require('sequelize');

const db = require('../db');

const Tone = db.define('tone', {
  tone: {
    type: ENUM('low', 'mid', 'high', 'rising', 'falling'),
    allowNull: false
  }
})

Tone.hasMany(Target);

module.exports = Tone;

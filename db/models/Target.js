'use strict';

const Sequelize = require('sequelize');

const db = require('../db');

const Target = db.define('target', {
  audioBuffer: {
    type: Sequelize.BLOB,
    allowNull: false
  },
  pitchSeries: {
    type: Sequelize.ARRAY,
    allowNull: false
  },
  englishTranslation: {
    type: Sequelize.STRING,
    allowNull: false
  },
  transliteration: {
    type: Sequelize.STRING,
    allowNull: false
  },
  thaiSpelling: { // link to an image on imgur
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
});

Target.belongsTo(Tone);

module.exports = Target;

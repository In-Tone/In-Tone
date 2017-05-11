'use strict';

const {STRING, ARRAY, INTEGER, FLOAT} = require('sequelize');

module.exports = db => db.define('target', {
  wav: {
    type: STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  pitches: {
    type: ARRAY(INTEGER),
    allowNull: false
  },
  duration: {
    type: FLOAT,
    allowNull: false
  },
  englishTranslation: {
    type: STRING,
    allowNull: false
  },
  transliteration: {
    type: STRING,
    allowNull: false
  },
  nativeSpelling: {
    type: STRING,
    validate: {
      isUrl: true // or unicode!
    }
  }
})

module.exports.associations = (Target, {ToneType}) => {
  Target.belongsTo(ToneType)
}

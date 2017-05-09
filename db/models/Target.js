'use strict';

const {STRING, ARRAY, INTEGER} = require('sequelize');

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
  englishTranslation: {
    type: STRING,
    allowNull: false
  },
  transliteration: {
    type: STRING,
    allowNull: false
  },
  thaiSpelling: {
    type: STRING,
    validate: {
      isUrl: true // or unicode!
    }
  }
})

module.exports.associations = (Target, {ToneType}) => {
  Target.belongsTo(ToneType)
}

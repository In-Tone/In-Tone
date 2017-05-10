'use strict'


// all our models were initialized and assigned as properties on db object, allowing us to destructure here:
const db = require('./index') // in bones it was const db = require('APP/db') (symlink)
const {Target} = db
const {ToneType} = db
const {mapValues} = require('lodash');
const Promise = require('bluebird');

function seedEverything() {
	const seeded = {
		toneTypes: toneTypes()
	}
	seeded.targets = targets(seeded)

	return Promise.props(seeded)

}

const toneTypes = seed(ToneType, {
	thaiMid: {
		language: 'thai',
		tone: 'mid'
	},
	thaiLow: {
		language: 'thai',
		tone: 'low'
	},
	thaiFalling: {
		language: 'thai',
		tone: 'falling'
	},
	thaiHigh: {
		language: 'thai',
		tone: 'high'
	},
	thaiRising: {
		language: 'thai',
		tone: 'rising'
	},
})

const targets = seed(Target, ({toneTypes}) =>  ({
	fallingChai: {
		wav: 'http://localhost:3000/audio/Falling-Chai-Yes.wav',
		pitches: [134,134,150,145,134,134,141,146,144,134,144,139,163,146,135,139,142,136,135,281,281,283,283,283,281,277,276,276,276,276,276,276,277,277,276,277,276,279,277,279,279,279,279,279,283,281,279,277,277,277,277,276,272,271,271,264,263,263,261,256,255,249,245,236,225,218,207,198,185,176,168,162,156,150,145,147,147,151,202,164,147],
		englishTranslation: 'yes',
		transliteration: '',
		thaiSpelling: 'http://i.imgur.com/TyMhrgJ.png',
		tone_type_id: 3
	},
	fallingHai: {
		wav: 'http://localhost:3000/audio/Falling-Hai-Give.wav',
		pitches: [150,144,152,140,135,147,134,156,147,162,134,135,145,137,137,142,281,146,285,288,285,283,281,281,281,279,281,279,281,279,279,277,279,279,281,281,281,281,283,283,283,281,281,283,283,281,283,283,285,285,285,283,283,279,277,276,274,271,264,259,253,245,240,232,222,214,207,197,191,179,174,166,163,158,156,151,151,155,150,154,151,161,134],
		englishTranslation: 'give',
		transliteration: '',
		thaiSpelling: 'http://i.imgur.com/heVUUL7.png',
		tone_type_id: 3
	},
	highChai: {
		wav: 'http://localhost:3000/audio/High-Chai-Use.wav',
		pitches: [134,134,134,154,146,136,145,144,139,142,136,137,137,140,142,134,136,134,134,258,259,255,255,255,253,252,249,249,246,244,242,242,240,238,238,236,236,236,236,235,235,233,233,235,233,235,235,235,235,235,233,236,235,237,237,238,241,244,248,251,253,256,258,261,266,266,271,276,281,286,290,294,296,296,300,302,304,304,304,300,296,288,277,134,134,251,251,155,167,137,171,134],
		englishTranslation: 'use',
		transliteration: '',
		thaiSpelling: 'http://i.imgur.com/hgBPYOR.png',
		tone_type_id: 4
	},
	highYai: {
		wav: 'http://localhost:3000/audio/High-Yai-Move.wav',
		pitches: [173,144,213,217,221,218,215,140,230,248,246,245,136,252,264,134,134,135,246,244,242,242,241,241,238,238,238,237,237,237,238,236,241,238,238,237,238,238,237,237,236,236,236,233,237,235,235,235,235,237,236,233,236,235,235,233,235,235,134,236,237,238,238,238,238,244,244,245,248,251,251,256,258,261,266,269,272,279,283,286,290,294,298,302,304,308,308,311,311,308,306,300,296,294,286,281,277,269,261,255,240,230,134,140,134,134],
		englishTranslation: 'move',
		transliteration: '',
		thaiSpelling: 'http://i.imgur.com/Ko7nwHD.png',
		tone_type_id: 4
	},
	lowLhai: {
		wav: 'http://localhost:3000/audio/Low-Lhai-Shoulder.wav',
		pitches: [134,134,228,222,221,219,219,218,218,214,213,212,212,165,134,202,200,199,198,195,193,191,188,187,186,185,185,183,181,180,178,176,174,174,173,172,170,170,170,168,167,170,169,168,174,170,169,166,169,164,166,163,164,163,162,160,159,158,155,153,148,149,146,143,145,143,142,140,145,146,153,155,154,174,142,144,157,151,176,178,173,164,162,179,179,181,188,179,179,181,134,134],
		englishTranslation: 'shoulder',
		transliteration: '',
		thaiSpelling: 'http://i.imgur.com/lsQnXts.png',
		tone_type_id: 2
	},
	lowMai: {
		wav: 'http://localhost:3000/audio/Low-Mai-New.wav',
		pitches: [134,211,205,205,205,205,207,208,209,211,176,213,210,206,206,206,202,204,203,200,199,198,197,195,194,193,190,188,188,184,184,181,179,179,176,174,172,172,171,168,168,168,167,166,166,177,162,165,164,164,165,164,163,164,163,165,160,158,156,155,163,160,152,152,152,153,156,164,151,151,152,151,154,154,155,154,152,155,154,156,162,159,159,161,167,170,178,134,134],
		englishTranslation: 'new',
		transliteration: '',
		thaiSpelling: 'http://i.imgur.com/j9jQHze.png',
		tone_type_id: 2
	},
	midKlai: {
		wav: 'http://localhost:3000/audio/Mid-Klai-Far.wav',
		pitches: [134,134,134,145,134,134,136,134,252,248,245,244,245,140,244,240,236,235,235,231,231,228,228,226,225,226,224,223,223,221,219,218,218,218,217,215,216,215,215,215,214,214,214,213,137,212,210,209,210,208,206,203,206,206,206,208,207,207,205,206,208,207,207,207,205,207,206,204,204,204,202,203,203,203,203,203,204,204,203,206,206,208,210,209,210,205,211,137,144,139,134,134],
		englishTranslation: 'far',
		transliteration: '',
		thaiSpelling: 'http://i.imgur.com/vgC7g3h.png',
		tone_type_id: 1
	},
	midPai: {
		wav: 'http://localhost:3000/audio/Mid-Pai-Go.wav',
		pitches: [148,142,233,233,231,227,228,227,227,226,226,226,225,226,225,224,225,223,224,224,222,224,224,224,224,224,223,221,221,221,219,218,217,215,215,214,213,210,212,210,209,211,210,210,211,209,209,211,211,211,211,212,210,212,210,211,211,211,213,212,212,211,210,211,210,211,211,213,212,214,215,213,218,218,218,207,201,134],
		englishTranslation: 'go',
		transliteration: '',
		thaiSpelling: 'http://i.imgur.com/Ktf4xwX.png',
		tone_type_id: 1
	},
	risingNhai: {
		wav: 'http://localhost:3000/audio/Rising-Nhai-Where.wav',
		pitches: [136,221,218,216,217,218,217,217,217,217,218,139,134,139,215,212,211,208,208,208,206,206,202,200,199,197,195,193,192,191,188,184,177,179,179,178,171,170,170,170,172,172,171,170,170,170,170,170,172,172,172,173,172,174,172,174,174,176,178,179,181,185,189,192,196,200,206,210,218,224,232,240,246,258,266,274,286,296,304,315,324,332,339,347,353,356,359,356,359,359,334,134,134],
		englishTranslation: 'where',
		transliteration: '',
		thaiSpelling: 'http://i.imgur.com/Ht2BR2T.png',
		tone_type_id: 5
	},
	risingSai: {
		wav: 'http://localhost:3000/audio/Rising-Sai-Clear.wav',
		pitches: [134,134,158,147,135,139,137,136,137,147,147,140,140,149,144,140,139,134,147,252,248,249,244,236,235,232,228,228,228,230,224,223,218,215,212,210,206,204,201,203,134,197,194,192,189,187,187,185,181,181,182,181,181,181,179,184,184,182,184,183,187,185,188,188,188,188,190,193,196,201,206,214,222,231,241,252,259,271,281,290,298,306,313,322,329,339,345,345,347,356,356,173,134],
		englishTranslation: 'clear',
		transliteration: '',
		thaiSpelling: 'http://i.imgur.com/fC1Eqi7.png',
		tone_type_id: 5
	}
}))

// module === require.main when this file is run directly from Node.js
if (module === require.main) {
	console.log('first here!')
  db.didSync
    .then(() => db.sync({force: true}))
		.then((data) => {
			console.log('here!')
			return data;
		})
    .then(seedEverything)
		.catch(err => console.error(err))
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {targets})




const Sequelize = require('sequelize');
const url = process.env.DATABASE_URL || 'postgres://localhost:5432/intone';

const db = module.exports = new Sequelize(url, {
	define: {
		underscored: true,
		freezeTableName: true,
		timestamps: true
	}
});

Object.assign(db, require('./models/index.js')(db), {createAndSync});

db.didSync = db.createAndSync();

function createAndSync(force=false) {
	return db.sync({force})
		.then(() => { console.log(`Synced models to db: ${url}`)
		.catch(err => { console.log(err)});
	});
}

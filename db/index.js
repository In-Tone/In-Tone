const Sequelize = require('sequelize');
// check if testing -- if yes, use test db "intone_test" -- otherwise use prod db "intone"
const name = (!!global.it) ? "intone_test" : "intone";
const url = `postgres://localhost:5432/${name}`;

const db = module.exports = new Sequelize(url, {
	logging: false,
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
		.then(() => { console.log(`Synced models to db: ${url}`) })
		.catch(err => { console.log(err)});
}

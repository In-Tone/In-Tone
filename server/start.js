// main.js/start.js/index.js

// say our sequelize instance is create in 'db.js'
const db = require('../db/db.js'); 

// and our server is created in 'server.js'

db.sync()  // sync our database
.then(() => require('./index.js')) // then start our express server
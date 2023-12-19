const app = require('./configs/app')();
const config = require('./configs/config/config');
const db = require('./configs/db');

//create the basic server setup 
app.create(config, db);

//start the server
app.start();
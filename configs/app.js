const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
module.exports = function () {
    let app = express(),
        create,
        start;

    create = (config, db) => {
        app.use(cors());
        app.options('*', cors());
        app.set('env', config.env);
        app.set('port', config.port);
        app.set('hostname', config.hostname);
        const mongoDB = process.env.MONGODB_URI || db.database;
        // mongoose.set('useFindAndModify', false);
        // mongoose.set('useCreateIndex', true);
        mongoose.connect(mongoDB);
        app.use(bodyParser.json({ limit: '150mb', type: 'application/json' }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        let routes = require('../routes');
        routes.init(app);
    }
    start = () => {
        let hostname = app.get('hostname'),
            port = app.get('port');

        app.listen(port, () => {
            console.log('Server is up and running on port number ' + port + " hostname " + hostname);
        });
    }
    return {
        create: create,
        start: start
    };
};
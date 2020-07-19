'use strict';

import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import compress from 'compression';
const helmet = require('helmet');
import routes from '../api/routes';
import config from '../config/apiConfig.js';

let app = express();
app.server = http.createServer(app);

app.use(bodyParser.json({
    limit : config.bodyLimit
}));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// api router
app.use('/api', routes);

module.exports = app;
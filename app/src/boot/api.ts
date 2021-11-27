'use strict';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compress from 'compression';
const helmet = require('helmet');
import {Router} from '../api/routes';
import {apiConfig} from '../config/apiConfig';
import {Application} from "express";

const app: Application = express();

app.use(bodyParser.json({
    limit : apiConfig.bodyLimit
}));

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// api router
app.use('/api', Router);

export {app as Api}
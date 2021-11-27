"use strict"

import * as winston from 'winston';


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json(),
        winston.format.prettyPrint(),
    ),
    defaultMeta: { service: 'domotik-node' },
    exitOnError: false,
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({ filename: 'logs/error.log', level: 'error', handleExceptions: true }),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});


export {logger as Logger}
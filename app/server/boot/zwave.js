'use strict';

import ZWave  from 'openzwave-shared';
import config from '../config/zwaveConfig';


let zwave = new ZWave({
    ConsoleOutput: config.consoleOutput,
});


process.on('SIGINT', function () {
    console.log('disconnecting...');
    zwave.disconnect(config.driverPath);
    // process.exit();
});


module.exports = zwave;
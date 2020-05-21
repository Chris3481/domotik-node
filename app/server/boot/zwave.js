
import ZWave from 'openzwave-shared';

import ZwaveEventSubscriber from '../subscribers/zwave/EventSubscriber';

import config from '../config/zwaveConfig';

/**
 * start Zwave module
 */
export function boot() {

    let zwave = new ZWave({
        ConsoleOutput: config.consoleOutput,
    });

    let eventSubscriber = new ZwaveEventSubscriber(zwave);

    eventSubscriber.initDriverEvents();
    eventSubscriber.initNodeEvents();
    eventSubscriber.initValueEvents();

    console.log("connecting to " + config.driverPath);
    zwave.connect(config.driverPath);

    process.on('SIGINT', function () {
        console.log('disconnecting...');
        zwave.disconnect(config.driverPath);
        // process.exit();
    });

}


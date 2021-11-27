'use strict';

import {Zwave} from './boot/zwave'
import {Api} from './boot/api';
import {zwaveConfig} from './config/zwaveConfig';
import {apiConfig} from './config/apiConfig';
import {zwaveEventSubscriber} from './subscribers/ZwaveEventSubscriber';
import {Logger} from "./services/Logger";
import {ZWaveNode} from 'zwave-js';
import {rabbitMq} from "./services/RabbitMQ/Publisher";

try {
    // Boot Zwave

    console.log('connecting to %s', zwaveConfig.driverPath);

    Zwave.once('driver ready', () => {

        zwaveEventSubscriber.initControllerEvents(Zwave.controller);

        Zwave.controller.nodes.forEach((node: ZWaveNode) => {

            zwaveEventSubscriber.initNodeEvents(node);
            zwaveEventSubscriber.initNodeValueEvents(node);
        });
    });

    // Start the driver. To await this method, put this line into an async method
    Zwave.start();

    // connect to rabbitMq
    rabbitMq.connect();

    // Boot API
    Api.listen(process.env.PORT || apiConfig.port, () => {
        // Logger.log('info', `API Started on port ${Api.address().port}`);
    });

} catch (e) {
    Logger.error('An unexpected error has occurred', {e});
}


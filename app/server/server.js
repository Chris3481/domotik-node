'use strict';

import Zwave                from './boot/zwave';
import Api                  from './boot/api';
import zwaveConfig          from './config/zwaveConfig';
import apiConfig            from './config/apiConfig';
import ZwaveEventSubscriber from './subscribers/ZwaveEventSubscriber';
import logger               from './services/Logger';
import publisher            from './services/RabbitMQ/Publisher';

try {
    // Boot Zwave
    ZwaveEventSubscriber.initDriverEvents();
    ZwaveEventSubscriber.initNodeEvents();
    ZwaveEventSubscriber.initValueEvents();

    console.log('connecting to %s', zwaveConfig.driverPath);
    Zwave.connect(zwaveConfig.driverPath);

    // connect to rabbitMq
    publisher.connect();

    // Boot API
    Api.server.listen(process.env.PORT || apiConfig.port, () => {
        logger.log('info', `API Started on port ${Api.server.address().port}`);
    });

} catch (e) {
    logger.error('An unexpected error has occurred', {e});
}


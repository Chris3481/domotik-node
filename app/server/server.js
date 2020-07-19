'use strict';

import Zwave                from './boot/zwave';
import Api                  from './boot/api';
import zwaveConfig          from "./config/zwaveConfig";
import apiConfig            from "./config/apiConfig";
import ZwaveEventSubscriber from "./subscribers/ZwaveEventSubscriber";


// Boot Zwave
ZwaveEventSubscriber.initDriverEvents();
ZwaveEventSubscriber.initNodeEvents();
ZwaveEventSubscriber.initValueEvents();

console.log('connecting to %s', zwaveConfig.driverPath);
Zwave.connect(zwaveConfig.driverPath);


// Boot API
Api.server.listen(process.env.PORT || apiConfig.port, () => {
    console.log(`Started on port ${Api.server.address().port}`);
});

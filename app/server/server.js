'use strict';

import Zwave                from './boot/zwave';
import config               from "./config/zwaveConfig";
import ZwaveEventSubscriber from "./subscribers/ZwaveEventSubscriber";

// boot Zwave
ZwaveEventSubscriber.initDriverEvents();
ZwaveEventSubscriber.initNodeEvents();
ZwaveEventSubscriber.initValueEvents();

console.log('connecting to %s', config.driverPath);
Zwave.connect(config.driverPath);

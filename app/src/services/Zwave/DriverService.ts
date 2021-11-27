'use strict';

import {Zwave}          from '../../boot/zwave';


class DriverService {

    /**
     * Soft reset the driver
     */
    softReset() {
        return Zwave.softReset();
    }

    /**
     * hard reset the driver
     */
    hardReset() {
        return Zwave.hardReset();
    }
}

export const driverService = new DriverService();
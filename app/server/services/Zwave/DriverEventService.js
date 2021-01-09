'use strict';

import logger from "../Logger";


class DriverEventService {

    constructor() {
        this.version = null;
        this.homeId  = null;
    }

    /**
     * Connected to openZwave controller
     *
     * @param version
     */
    connected(version) {
        this.version = version;

        logger.info('Zwave connected', {version});
    }

    /**
     * @param homeId
     */
    driverReady(homeId) {
        this.homeId = homeId;

        console.log('scanning homeId=0x%s...', homeId.toString(16));

        // @todo notice frontend application
    }

    /**
     *
     */
    driverFailed() {
        logger.error('Failed to start Zwave driver');
    }

    /**
     * Network scan complete
     */
    scanComplete() {
        logger.info('Zwave scan complete');
    }

    /**
     * @todo understand what it does exactly
     *
     * @param n
     * @param rv
     * @param st
     * @param message
     */
    controllerCommand(n, rv, st, message) {
        // console.log('controller command feedback: %s node==%d, retval=%d, state=%d', message, n, rv, st);
    }

    /**
     * @returns {*}
     */
    getHomeId() {
        return this.homeId;
    }
}

module.exports = new DriverEventService();
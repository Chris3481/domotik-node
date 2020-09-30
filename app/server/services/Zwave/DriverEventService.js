'use strict';

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

        console.log("**** CONNECTED ****");
        console.log("OpenZwave version:", version);
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
        console.log('failed to start driver');

        // process.exit();

        // @todo notice frontend application
    }

    /**
     * Devices notifications
     *
     * @param nodeId
     * @param notification
     */
    nodeNotification(nodeId, notification) {

        switch (notification) {
            case 0:
                console.log('node%d: message complete', nodeId);
                break;
            case 1:
                console.log('node%d: timeout', nodeId);
                break;
            case 2:
                console.log('node%d: nop', nodeId);
                break;
            case 3:
                console.log('node%d: node awake', nodeId);
                break;
            case 4:
                console.log('node%d: node sleep', nodeId);
                break;
            case 5:
                console.log('node%d: node dead', nodeId);
                break;
            case 6:
                console.log('node%d: node alive', nodeId);
                break;
        }

        // @todo notice frontend application
    }

    /**
     * Network scan complete
     */
    scanComplete() {

        console.log('====> scan complete');
        // set dimmer node 5 to 50%
        //    zwave.setValue(5,38,1,0,50);
        //zwave.setValue({node_id:5,	class_id: 38,	instance:1,	index:0}, 50 );
        // this.zwave.requestAllConfigParams(3);
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
        console.log('controller command feedback: %s node==%d, retval=%d, state=%d', message, n, rv, st);
    }

    /**
     * @returns {*}
     */
    getHomeId() {
        return this.homeId;
    }
}

module.exports = new DriverEventService();
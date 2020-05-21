'use strict';

let DriverService = require('../../services/Zwave/DriverService');
let NodeService   = require('../../services/Zwave/NodeService');

module.exports = class ZwaveEvents {

    /**
     * @param Zwave
     */
    constructor(Zwave) {

        this.zwave = Zwave;

        this.driverService = new DriverService(Zwave);
        this.nodeService   = new NodeService(Zwave);
    }

    /**
     * Controller events
     */
    initDriverEvents() {

        this.zwave.on('connected', version => {
            this.driverService.connected(version);
        });

        this.zwave.on('driver ready', homeId => {
            this.driverService.driverReady(homeId);
        });

        this.zwave.on('driver failed', () => {
            this.driverService.driverFailed();
        });

        this.zwave.on('notification', (nodeId, notification) => {
            this.driverService.nodeNotification(nodeId, notification)
        });

        this.zwave.on('scan complete', () => {
            this.driverService.scanComplete();
        });

        this.zwave.on('controller command', (n, rv, st, message) => {
            this.driverService.controllerCommand(n, rv, st, message)
        });
    }

    /**
     * Node events
     */
    initNodeEvents() {

        this.zwave.on('node added', nodeId => {
            this.nodeService.nodeAdded(nodeId);
        });

        this.zwave.on('node ready', (nodeId, nodeInfo) => {
            this.nodeService.nodeReady(nodeId, nodeInfo);
        });

        this.zwave.on('node event', (nodeId, data) => {
            this.nodeService.nodeEvent(nodeId, data);
        });
    }

    /**
     * @todo maybe this listener should be initialized before node events
     *
     * Value event
     */
    initValueEvents()
    {
        this.zwave.on('value added', (nodeId, comClass, value) => {
            this.nodeService.setNodeValue(nodeId, comClass, value);
        });

        this.zwave.on('value changed', (nodeId, comClass, value) => {
            this.nodeService.setNodeValue(nodeId, comClass, value);
        });

        this.zwave.on('value removed', (nodeId, comClass, index) => {
            this.nodeService.removeNodeValue(nodeId, comClass, index);
        });
    }

}
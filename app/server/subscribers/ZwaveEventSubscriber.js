'use strict';

import Zwave from '../boot/zwave';

let driverService = require('../services/Zwave/DriverService');
let nodeService   = require('../services/Zwave/NodeService');

class ZwaveEventSubscriber {
    
    /**
     * Controller events
     */
    initDriverEvents() {

       Zwave.on('connected', version => {
            driverService.connected(version);
        });

       Zwave.on('driver ready', homeId => {
            driverService.driverReady(homeId);
        });

       Zwave.on('driver failed', () => {
            driverService.driverFailed();
        });

       Zwave.on('notification', (nodeId, notification) => {
            driverService.nodeNotification(nodeId, notification)
        });

       Zwave.on('scan complete', () => {
            driverService.scanComplete();
        });

       Zwave.on('controller command', (n, rv, st, message) => {
            driverService.controllerCommand(n, rv, st, message)
        });
    }

    /**
     * Node events
     */
    initNodeEvents() {

       Zwave.on('node added', nodeId => {
            nodeService.nodeAdded(nodeId);
        });

       Zwave.on('node ready', (nodeId, nodeInfo) => {
            nodeService.nodeReady(nodeId, nodeInfo);
        });

       Zwave.on('node event', (nodeId, data) => {
            nodeService.nodeEvent(nodeId, data);
        });
    }

    /**
     * @todo maybe this listener should be initialized before node events
     *
     * Value event
     */
    initValueEvents()
    {
       Zwave.on('value added', (nodeId, comClass, value) => {
            nodeService.setNodeValue(nodeId, comClass, value);
        });

       Zwave.on('value changed', (nodeId, comClass, value) => {
            nodeService.setNodeValue(nodeId, comClass, value);
        });

       Zwave.on('value removed', (nodeId, comClass, index) => {
            nodeService.removeNodeValue(nodeId, comClass, index);
        });
    }
}

module.exports = new ZwaveEventSubscriber();
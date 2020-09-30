'use strict';

import Zwave from '../boot/zwave';

let driverEventService = require('../services/Zwave/DriverEventService');
let nodeEventService   = require('../services/Zwave/NodeEventService');

class ZwaveEventSubscriber {
    
    /**
     * Controller events
     */
    initDriverEvents() {

       Zwave.on('connected', version => {
           driverEventService.connected(version);
        });

       Zwave.on('driver ready', homeId => {
           driverEventService.driverReady(homeId);
        });

       Zwave.on('driver failed', () => {
           driverEventService.driverFailed();
        });

       Zwave.on('notification', (nodeId, notification) => {
           driverEventService.nodeNotification(nodeId, notification)
        });

       Zwave.on('scan complete', () => {
           driverEventService.scanComplete();
        });

       Zwave.on('controller command', (n, rv, st, message) => {
           driverEventService.controllerCommand(n, rv, st, message)
        });
    }

    /**
     * Node events
     */
    initNodeEvents() {

       Zwave.on('node added', nodeId => {
           nodeEventService.nodeAdded(nodeId);
        });

       Zwave.on('node ready', (nodeId, nodeInfo) => {
           nodeEventService.nodeReady(nodeId, nodeInfo);
        });

       Zwave.on('node event', (nodeId, data) => {
           nodeEventService.nodeEvent(nodeId, data);
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
           nodeEventService.valueChanged(nodeId, comClass, value);
        });

       Zwave.on('value changed', (nodeId, comClass, value) => {
           nodeEventService.valueChanged(nodeId, comClass, value);
        });

       Zwave.on('value removed', (nodeId, comClass, index) => {
           nodeEventService.valueRemoved(nodeId, comClass, index);
        });
    }
}

module.exports = new ZwaveEventSubscriber();
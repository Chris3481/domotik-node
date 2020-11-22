'use strict';

import Zwave from '../boot/zwave';
import Publisher from "../services/RabbitMQ/Publisher";

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

           Publisher.publishToQueue( {event:'node_added', nodeId:nodeId});
       });

       Zwave.on('node ready', (nodeId, nodeInfo) => {
           nodeEventService.nodeReady(nodeId, nodeInfo);

           Publisher.publishToQueue({event:'node_ready', nodeId:nodeId, nodeData:nodeInfo});
       });

       Zwave.on('node event', (nodeId, data) => {
           nodeEventService.nodeEvent(nodeId, data);

           Publisher.publishToQueue({event:'node_event', nodeId:nodeId, nodeData:data});
       });

        Zwave.on('notification', (nodeId, notification) => {
            nodeEventService.nodeNotification(nodeId, notification);

            Publisher.publishToQueue({event:'node_notification', nodeId:nodeId, nodeData:notification});
        });
    }

    /**
     * Value event
     */
    initValueEvents() {

       Zwave.on('value added', (nodeId, comClass, value) => {
           nodeEventService.valueChanged(nodeId, comClass, value);

           Publisher.publishToQueue({event:'node_value_added', nodeId:nodeId, nodeData:value});
       });

       Zwave.on('value changed', (nodeId, comClass, value) => {
           nodeEventService.valueChanged(nodeId, comClass, value);

           Publisher.publishToQueue({event:'node_value_changed', nodeId:nodeId, nodeData:value});
       });

       Zwave.on('value removed', (nodeId, comClass,instance,  index) => {

           const valueId = nodeId+'-'+comClass+'-'+instance+'-'+index;

           nodeEventService.valueRemoved(nodeId, valueId);

           Publisher.publishToQueue({event:'node_value_removed', nodeId:nodeId, nodeData:valueId});
        });
    }
}

module.exports = new ZwaveEventSubscriber();
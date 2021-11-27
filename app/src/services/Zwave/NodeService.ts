'use strict';

import {Zwave} from '../../boot/zwave';
import {nodeEventService} from './NodeEventService';
import {ValueID} from "@zwave-js/core";
import {ZWaveNode} from "zwave-js";

class NodeService {

    /**
     * Start inclusion mode
     */
    startInclusion() {
        return Zwave.controller.beginInclusion();
    }

    /**
     * Start inclusion mode
     */
    startExclusion() {
        return Zwave.controller.beginExclusion();
    }

    /**
     * @param valueId
     * @param value
     */
    setNodeValue(valueId, value) {

        const nodeId = valueId.charAt(0);

        const node: ZWaveNode = nodeEventService.getNodeById(nodeId);
        if (!node) {
            throw new Error('Unable to set node value: node not found');
        }

        const nodeValue = node.getValue(valueId);
        if (!nodeValue) {
            throw new Error('Unable to set node value: value not found');
        }

        let formattedValue = null;

        //if (nodeValue.type === 'bool') {
        //    formattedValue = (value == 'true' || value == '1');
        //} else {
            // @todo format other value types
        //    formattedValue = value;
        //}

        console.log('================> Setting node %s valueId %s value', nodeId, valueId, value);

        // node.setValue();


    }

    /**
     * @param nodeId
     */
    getNodeUserValues(nodeId) {

        const node: ZWaveNode = nodeEventService.getNodeById(nodeId);
        if (!node) {
            throw new Error('Unable to set node value: node not found');
        }

        // return node.getUserValues();
    }

    /**
     * @param nodeId
     */
    getNodeConfigValues(nodeId) {

        const node: ZWaveNode = nodeEventService.getNodeById(nodeId);
        if (!node) {
            throw new Error('Unable to set node value: node not found');
        }

        // return node.getConfigValues();
    }


}

export const nodeService = new NodeService();
'use strict';

import Zwave            from '../../boot/zwave';
import NodeEventService from './NodeEventService';

class NodeService {

    /**
     * Start inclusion mode
     */
    startInclusion() {
        return Zwave.addNode(true);
    }

    /**
     * Start inclusion mode
     */
    startExclusion() {
        return Zwave.removeNode();
    }

    /**
     * @param valueId
     * @param value
     */
    setNodeValue(valueId, value) {

        const nodeId = valueId.charAt(0);

        const node = NodeEventService.getNodeById(nodeId);
        if (!node) {
            throw new Error('Unable to set node value: node not found');
        }

        const nodeValue = node.getValueById(valueId);
        if (!nodeValue) {
            throw new Error('Unable to set node value: value not found');
        }

        let formattedValue = null;

        if (nodeValue.type === 'bool') {
            formattedValue = (value == 'true' || value == '1');
        } else {
            // @todo format other value types
            formattedValue = value;
        }

        console.log('================> Setting node %s valueId %s value', nodeId, valueId, value);

        return Zwave.setValue(nodeId, nodeValue.class_id,  nodeValue.instance, nodeValue.index, formattedValue);
    }

    /**
     * @param nodeId
     */
    getNodeUserValues(nodeId) {

        const node = NodeEventService.getNodeById(nodeId);
        if (!node) {
            throw new Error('Unable to set node value: node not found');
        }

        return node.getUserValues();
    }

    /**
     * @param nodeId
     */
    getNodeConfigValues(nodeId) {

        const node = NodeEventService.getNodeById(nodeId);
        if (!node) {
            throw new Error('Unable to set node value: node not found');
        }

        return node.getConfigValues();
    }

}

module.exports = new NodeService();
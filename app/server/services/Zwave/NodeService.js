'use strict';

import Zwave from '../../boot/zwave';

let nodes = [];

class DriverService {

    /**
     * Return the network nodes
     *
     * @returns {[]}
     */
    getList() {
        return nodes;
    }

    /**
     * New node detected but not ready
     *
     * @param nodeId
     */
    nodeAdded(nodeId) {

        nodes[nodeId] = {
            manufacturer:   '',
            manufacturerId: '',
            product:        '',
            productType:    '',
            productId:      '',
            type:           '',
            name:           '',
            loc:            '',
            classes:        {},
            ready:          false,
        };
    }

    /**
     * The node is ready
     *
     * @todo Is it the last event triggered when node is initialized ?
     *
     * @param nodeId
     * @param nodeInfo
     */
    nodeReady(nodeId, nodeInfo) {

        console.log('node is ready');
        console.log(nodeInfo);

        Object.assign(nodes[nodeId], {
            manufacturer:   nodeInfo.manufacturer,
            manufacturerId: nodeInfo.manufacturerid,
            product:        nodeInfo.product,
            productType:    nodeInfo.producttype,
            productId:      nodeInfo.productid,
            type:           nodeInfo.type,
            name:           nodeInfo.name,
            loc:            nodeInfo.loc,
            ready:          true,
        });

        for (let comClass in nodes[nodeId].classes) {
            switch (comClass) {
                case 0x25: // COMMAND_CLASS_SWITCH_BINARY
                case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL

                    console.log('Polling: node id [%d] comClass [%d]', nodeId, comClass);
                    Zwave.enablePoll(nodeId, comClass);
                    break;
            }


            let values = nodes[nodeId].classes[comClass];

            for (let idx in values) {
                console.log('nodeId [%d]  %s = %s', nodeId, values[idx]['label'], values[idx]['value']);
            }
        }
    }

    /**
     * Node emits event
     *
     * @param nodeId
     * @param data
     */
    nodeEvent(nodeId, data) {
        console.log('node%d event: Basic set %d', nodeId, data);

        //@todo log this to the database / notice frontend
    }

    /**
     * @param nodeId
     * @param comClass
     * @param value
     */
    setNodeValue(nodeId, comClass, value) {

        let node = nodes[nodeId];

        if (!node.classes[comClass]) {
            nodes[nodeId].classes[comClass] = {};
        }

        if (node.ready) {
            let oldValue = node.classes[comClass][value.index];
            let newValue = value['value'];

            console.log('node%d: changed: %d:%s:%s->%s', nodeId, comClass, value['label'], oldValue, newValue);

            // @todo notify frontend
        }

        console.log(value);

        nodes[nodeId].classes[comClass][value.index] = value;
        // @todo notify frontend
    }

    /**
     * @param nodeId
     * @param comClass
     * @param index
     */
    removeNodeValue(nodeId, comClass, index) {
        console.log('remove node value for nodeId [%s] comClass [%s] ', nodeId, comClass);

        let node = nodes[nodeId];

        if (node.classes[comClass] && node.classes[comClass][index]) {
            delete nodes[nodeId].classes[comClass][index];
        }
    }

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


}

module.exports = new DriverService();
'use strict';

import Node  from '../../Models/Node';


/**
 * This class is handles the zwave node events
 */
class NodeEventService {

    constructor() {
        this.nodes = [];
    }

    /**
     * Return the network nodes
     *
     * @returns {[]}
     */
    getList() {
        return this.nodes.filter(node => node.data.ready === true);
    }

    /**
     * New node detected but not ready
     *
     * @param nodeId
     */
    nodeAdded(nodeId) {

        console.log('<============== New node detected %s ==============>', nodeId)

        const node = new Node();

        this.setNode(nodeId, node);
    }

    /**
     * The node is ready
     *
     * @param nodeId
     * @param nodeInfo
     */
    nodeReady(nodeId, nodeInfo) {

        console.log('<============== New node ready %s ==============>', nodeId);
        console.log(nodeInfo);

        const node = this.getNodeById(nodeId);

        if (!node) {
            return;
        }

        const updatedNode = node.setNodeInfo(nodeInfo);

        // Update node reference in this class
        this.setNode(nodeId, updatedNode);


        // todo do some thing smart for polling

        // const comClasses = node.getAllClasses();
        //
        // for (let comClass in comClasses) {
        //     switch (comClass) {
        //         case 0x25: // COMMAND_CLASS_SWITCH_BINARY
        //         case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
        //
        //             console.log('Polling: node id [%d] comClass [%d]', nodeId, comClass);
        //             Zwave.enablePoll(nodeId, comClass);
        //             break;
        //     }
        //
        //
        //     let values = nodes[nodeId].classes[comClass];
        //
        //     for (let idx in values) {
        //         console.log('nodeId [%d]  %s = %s', nodeId, values[idx]['label'], values[idx]['value']);
        //     }
        //}
    }

    /**
     * Node emits event
     *
     * @param nodeId
     * @param data
     */
    nodeEvent(nodeId, data) {
        console.log('================> node%d event: Basic set %d', nodeId, data);

        //@todo log this to the database / notice frontend
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
     * Node added or set value
     *
     * @param nodeId
     * @param classId
     * @param value
     */
    valueChanged(nodeId, classId, value) {

        let node = this.getNodeById(nodeId);

        if (!node) {
            return;
        }

        console.log('=======> Node %s value changed');
        console.log(value);

        let updatedNode = node.setNodeValue(value);

        // Update node reference in this class
        this.setNode(nodeId, updatedNode);

        // @todo notify frontend
    }

    /**
     * Node removed value
     *
     * @param nodeId
     * @param comClass
     * @param instance
     * @param index
     */
    valueRemoved(nodeId, comClass, instance, index) {

        const node = this.getNodeById(nodeId);
        const valueId = nodeId+'-'+comClass+'-'+instance+'-'+index;

        if (!node) {
            return;
        }

        console.log('========> remove node value for nodeId [%s] valueId [%s] ', nodeId, valueId);

        node.deleteNodeValue(valueId);
    }

    /**
     * @param id
     * @param node
     * @returns {NodeEventService}
     */
    setNode(id, node) {

        if (!node instanceof Node) {
            throw new Error('node must be an instance of Node')
        }

        this.nodes[id] = node;

        return this;
    }

    /**
     *
     * @param id
     * @returns {null|Node}
     */
    getNodeById(id) {
        if(typeof this.nodes[id] === 'undefined') {
            return null;
        }

        return this.nodes[id];
    }

}

module.exports = new NodeEventService();
'use strict';

import Node  from '../../Models/Node';
import Zwave from '../../boot/zwave';
import logger from "../Logger";

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

        logger.info( 'New node detected', {nodeId});

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

        nodeInfo.ready = true;

        logger.info( 'New node ready', {nodeId, nodeInfo});

        let node = this.getNodeById(nodeId);

        if (!node) {
            return;
        }

        const updatedNode = node.setNodeInfo(nodeInfo);

        // Update node reference in this class
        this.setNode(nodeId, updatedNode);

        // this.enablePolling(node);
    }

    /**
     * Enable polling for all available values
     *
     * @param node
     * @returns {null}
     */
    enablePolling(node) {

        if (!node instanceof Node) {
            throw new Error('node must be an instance of Node')
        }

        const userValues = node.getUserValues();

        if (!userValues) {
            return null;
        }

        userValues.forEach((value) => {
            console.log('===============> Polling: node id [%d] [%s]', value.node_id, value.label);

            Zwave.enablePoll(value, 500);
        });
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

        let node = this.getNodeById(nodeId);

        switch (notification) {
            case 0:
                logger.log('info', 'Node notification: Message complete', {nodeId});
                break;
            case 1:
                logger.log('info', 'Node notification: Timeout', {nodeId});
                break;
            case 2:
                logger.log('info', 'Node notification: Nop', {nodeId});
                break;
            case 3:
                logger.log('info', 'Node notification: Awake', {nodeId});
                break;
            case 4:
                logger.log('info', 'Node notification: Node sleep', {nodeId});
                break;
            case 5:
                logger.log('info', 'Node notification: Node dead', {nodeId});

                // Do not remove as the node can come back later
                this.setNode(nodeId, node.setReady(false));

                break;
            case 6:
                logger.log('info', 'Node notification: Node alive', {nodeId});

                this.setNode(nodeId, node.setReady(true));

                break;
        }
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

        console.log('=======> Node %s value changed', nodeId);
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
     * @param valueId
     */
    valueRemoved(nodeId, valueId) {

        const node = this.getNodeById(nodeId);

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
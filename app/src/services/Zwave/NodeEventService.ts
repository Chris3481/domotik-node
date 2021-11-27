'use strict';

import {Logger} from "../Logger";
import {ZWaveNode, ZWaveNodeValueAddedArgs} from "zwave-js";
import {TranslatedValueID} from "zwave-js";

/**
 * This class is handles the zwave node events
 */
class NodeEventService {

    private nodes: ZWaveNode[];

    constructor() {
        this.nodes = [];
    }

    /**
     * Return the network nodes
     *
     * @returns {[]}
     */
    getList() {



    }

    /**
     * New node detected but not ready
     *
     * @param node
     */
    nodeAdded(node: ZWaveNode) {

        Logger.info( 'New node detected', node.id);

        this.setNode(node);
    }

    /**
     * The node is ready
     *
     * @param node
     */
    nodeReady(node: ZWaveNode) {

        Logger.info( 'New node ready', node.id);

        const valueIds: TranslatedValueID[] = node.getDefinedValueIDs();

        this.setNode(node);

        // this.enablePolling(node);
    }

    /**
     * Enable polling for all available values
     *
     * @param node
     * @returns {null}
     */
    enablePolling(node: ZWaveNode) {

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
                Logger.log('info', 'Node notification: Message complete', {nodeId});
                break;
            case 1:
                Logger.log('info', 'Node notification: Timeout', {nodeId});
                break;
            case 2:
                Logger.log('info', 'Node notification: Nop', {nodeId});
                break;
            case 3:
                Logger.log('info', 'Node notification: Awake', {nodeId});
                break;
            case 4:
                Logger.log('info', 'Node notification: Node sleep', {nodeId});
                break;
            case 5:
                Logger.log('info', 'Node notification: Node dead', {nodeId});

                // Do not remove as the node can come back later
                //this.setNode(nodeId, node.setReady(false));

                break;
            case 6:
                Logger.log('info', 'Node notification: Node alive', {nodeId});

                //this.setNode(nodeId, node.setReady(true));

                break;
        }
    }

    /**
     * Node added or set value
     *
     * @param node
     * @param args
     */
    valueChanged(node: ZWaveNode, args: ZWaveNodeValueAddedArgs) {


        console.log('=======> Node %s value changed', node.id);
        console.log(args.newValue);
    }

    /**
     * Node removed value
     *
     * @param node
     * @param args
     */
    valueRemoved(node: ZWaveNode, args) {

        console.log('========> remove node value for nodeId [%s] valueId [%s] ', node.id, args.propertyName);
    }

    /**
     * @param node
     * @returns {NodeEventService}
     */
    setNode(node: ZWaveNode) {

        this.nodes[node.id] = node;

        return this;
    }

    /**
     * @param id
     * @returns {null|ZWaveNode}
     */
    getNodeById(id): ZWaveNode {
        if(typeof this.nodes[id] === 'undefined') {
            return null;
        }

        return this.nodes[id];
    }

}

export const nodeEventService = new NodeEventService();
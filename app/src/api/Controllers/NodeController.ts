'use strict';

import {nodeEventService} from '../../services/Zwave/NodeEventService';
import {nodeService}      from '../../services/Zwave/NodeService';

class NodeController {

    /**
     * List all network nodes
     *
     * @param req
     * @param res
     * @returns {any}
     */
    list(req, res) {
        let response = [];

        let list = nodeEventService.getList();

        //list.forEach((node) => { response.push(node.data); });

        return res.json({nodes: [] });
    }

    /**
     * @param req
     * @param res
     */
    setNodeValue(req, res) {

        const valueId = req.params.valueId;
        const value   = req.params.value;

        nodeService.setNodeValue(valueId, value);

        return res.json({message: 'value set'});
    }

    /**
     * @param req
     * @param res
     * @returns {*}
     */
    getNodeUserValues(req, res) {

        const nodeId = req.params.nodeId;

        const values = nodeService.getNodeUserValues(nodeId);

        return res.json(values);
    }

    /**
     * @param req
     * @param res
     * @returns {*}
     */
    getNodeConfigValues(req, res) {

        const nodeId = req.params.nodeId;

        const values = nodeService.getNodeConfigValues(nodeId);

        return res.json(values);
    }
}

export const nodeController = new NodeController();
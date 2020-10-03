'use strict';

import NodeEventService from '../../services/Zwave/NodeEventService';
import NodeService      from '../../services/Zwave/NodeService';

class NodeController {

    /**
     * List all network nodes
     *
     * @param req
     * @param res
     * @returns {any}
     */
    list(req, res) {
        return res.json({nodes: NodeEventService.getList() });
    }

    /**
     * @param req
     * @param res
     */
    setNodeValue(req, res) {

        const nodeId  = req.params.nodeId;
        const valueId = req.params.valueId;
        const value   = req.params.value;

        NodeService.setNodeValue(nodeId, valueId, value);

        return res.json({message: 'value set'});
    }
}

module.exports = new NodeController();
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
        let response = [];

        let list = NodeEventService.getList();

        list.forEach((node) => { response.push(node.data); });

        return res.json({nodes: response });
    }

    /**
     * @param req
     * @param res
     */
    setNodeValue(req, res) {

        const valueId = req.params.valueId;
        const value   = req.params.value;

        NodeService.setNodeValue(valueId, value);

        return res.json({message: 'value set'});
    }
}

module.exports = new NodeController();
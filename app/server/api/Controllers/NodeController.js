'use strict';

import NodeEventService   from '../../services/Zwave/NodeEventService';

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
}

module.exports = new NodeController();
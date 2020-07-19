'use strict';

import DriverService from '../../services/Zwave/DriverService';
import NodeService   from '../../services/Zwave/NodeService';

class NodeController {

    /**
     * List all network nodes
     *
     * @param req
     * @param res
     * @returns {any}
     */
    list(req, res) {
        return res.json({nodes: NodeService.getList() });
    }
}

module.exports = new NodeController();
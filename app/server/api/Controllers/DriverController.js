'use strict';

import DriverEventService from '../../services/Zwave/DriverEventService';
import NodeService        from '../../services/Zwave/NodeService';


class DriverController {

    /**
     * Get the driver home ID
     *
     * @param req
     * @param res
     * @returns {any}
     */
    homeId(req, res) {
        return res.json({homeId: DriverEventService.getHomeId() });
    }

    /**
     * Start inclusion mode
     *
     * @param req
     * @param res
     * @returns {any}
     */
    startInclusion(req, res) {
        const response = NodeService.startInclusion();

        if (response) {
            return res.json({message: 'inclusion started' });
        }

        return res.status(400).json({message: 'inclusion failed to start'});
    }

    /**
     * Start inclusion mode
     *
     * @param req
     * @param res
     * @returns {any}
     */
    startExclusion(req, res) {
        const response = NodeService.startExclusion();

        if (response) {
            return res.json({message: 'exclusion started'});
        }

        return res.status(400).json({message: 'exclusion failed to start'});
    }
}

module.exports = new DriverController();
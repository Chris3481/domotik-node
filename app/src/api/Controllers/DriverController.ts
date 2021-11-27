'use strict';

import {driverEventService} from '../../services/Zwave/DriverEventService';
import {driverService}      from '../../services/Zwave/DriverService';
import {nodeService}        from '../../services/Zwave/NodeService';


class DriverController {

    /**
     * Get the driver home ID
     *
     * @param req
     * @param res
     * @returns {any}
     */
    homeId(req, res) {
        return res.json({homeId: driverEventService.getHomeId() });
    }

    /**
     * Start inclusion mode
     *
     * @param req
     * @param res
     * @returns {any}
     */
    startInclusion(req, res) {
        const response = nodeService.startInclusion();

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
        const response = nodeService.startExclusion();

        if (response) {
            return res.json({message: 'exclusion started'});
        }

        return res.status(400).json({message: 'exclusion failed to start'});
    }

    /**
     * Soft reset the driver
     *
     * @param req
     * @param res
     * @returns {any}
     */
    softReset(req, res) {

        try {
            driverService.softReset();

            return res.json({message: 'Soft reset OK'});

        } catch (e) {
            return res.json({message: 'hard reset device'});
        }
    }

    /**
     * Start inclusion mode
     *
     * @param req
     * @param res
     * @returns {any}
     */
    hardReset(req, res) {

        try {
            driverService.hardReset();

            return res.json({message: 'Hard reset OK'});

        } catch (e) {
            return res.json({message: 'hard reset device'});
        }
    }
}

export const driverController = new DriverController();
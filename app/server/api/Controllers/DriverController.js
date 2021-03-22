'use strict';

import DriverEventService from '../../services/Zwave/DriverEventService';
import DriverService      from '../../services/Zwave/DriverService';


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

    /**
     * Soft reset the driver
     *
     * @param req
     * @param res
     * @returns {any}
     */
    softReset(req, res) {

        try {
            DriverService.softReset();

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
            DriverService.hardReset();

            return res.json({message: 'Hard reset OK'});

        } catch (e) {
            return res.json({message: 'hard reset device'});
        }
    }
}

module.exports = new DriverController();
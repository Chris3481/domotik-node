'use strict';

import DriverService from '../../services/Zwave/DriverService';


class DriverController {

    /**
     * Get the driver home ID
     *
     * @param req
     * @param res
     * @returns {any}
     */
    homeId(req, res) {
        return res.json({homeId: DriverService.getHomeId() });
    }
}

module.exports = new DriverController();
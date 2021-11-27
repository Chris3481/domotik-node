"use strict";

import {driverController} from './Controllers/DriverController'
import {nodeController} from './Controllers/NodeController'
import {Router} from 'express';

const router = Router();


router.get('/', (req, res) => {
    res.json();
});

// Driver
router.get('/driver/home-id', driverController.homeId);

router.get('/driver/start-inclusion', driverController.startInclusion);

router.get('/driver/start-exclusion', driverController.startExclusion);

router.get('/driver/soft-reset', driverController.softReset);

router.get('/driver/hard-reset', driverController.hardReset);

// Device
router.get('/device/list', nodeController.list);

router.get('/device/set-value/:valueId/:value', nodeController.setNodeValue);

router.get('/device/get-node-values/user/:nodeId', nodeController.getNodeUserValues);

router.get('/device/get-node-values/config/:nodeId', nodeController.getNodeConfigValues);

export {router as Router}
"use strict";

import { version } from '../../package.json';
import express     from 'express';

import DriverController from './Controllers/DriverController'
import NodeController   from './Controllers/NodeController'

let router = express.Router();



router.get('/', (req, res) => {
    res.json({ version });
});

// Driver
router.get('/driver/home-id', (req, res) => {
    DriverController.homeId(req, res);
});

router.get('/driver/start-inclusion', (req, res) => {
    DriverController.startInclusion(req, res);
});

router.get('/driver/start-exclusion', (req, res) => {
    DriverController.startExclusion(req, res);
});

router.get('/driver/soft-reset', (req, res) => {
    DriverController.softReset(req, res);
});

router.get('/driver/hard-reset', (req, res) => {
    DriverController.hardReset(req, res);
});

// Device
router.get('/device/list', (req, res) => {
    NodeController.list(req, res);
});

router.get('/device/set-value/:valueId/:value', (req, res) => {
    NodeController.setNodeValue(req, res);
});

router.get('/device/get-node-values/user/:nodeId', (req, res) => {
    NodeController.getNodeUserValues(req, res);
});

router.get('/device/get-node-values/config/:nodeId', (req, res) => {
    NodeController.getNodeConfigValues(req, res);
});

module.exports = router;
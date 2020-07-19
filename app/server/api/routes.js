"use strict";

import { version } from '../../package.json';
import express     from 'express';

import DriverController from './Controllers/DriverController'
import NodeController   from './Controllers/NodeController'

let router = express.Router();



router.get('/', (req, res) => { res.json({ version }) });

// Driver
router.get('/driver/home-id', (req, res) => { DriverController.homeId(req, res) });

// Device
router.get('/device/list', (req, res) => { NodeController.list(req, res) });


module.exports = router;
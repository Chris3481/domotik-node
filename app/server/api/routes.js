"use strict";

import { version } from '../../package.json';
import express from 'express';

let router = express.Router();


router.get('/', (req, res) => {

        res.json({ version });
});


module.exports = router;
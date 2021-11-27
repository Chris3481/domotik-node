'use strict';

import {Driver} from "zwave-js";
import {zwaveConfig} from "../config/zwaveConfig";

// Tell the driver which serial port to use
const driver = new Driver(zwaveConfig.driverPath);

// You must add a handler for the error event before starting the driver
driver.on("error", (e) => {
    // Do something with it
    console.error(e);
});

export {driver as Zwave}
'use strict';

import Zwave from '../../boot/zwave';

class NodeService {

    /**
     * Start inclusion mode
     */
    startInclusion() {
        return Zwave.addNode(true);
    }

    /**
     * Start inclusion mode
     */
    startExclusion() {
        return Zwave.removeNode();
    }

    setValue(nodeId, classId, index, instance, value) {

        // if Zwave Node #3 is a binary switch, to turn it on and off, use command class 37
        // zwave.setValue(3, 37,  1,  0,  true);  // node 3: turn on
        // zwave.setValue(3, 37,  1,  0,  false); // node 3: turn off
        // zwave.setValue({ node_id:3, class_id: 37, instance:1, index:0}, false); // the same turn-off command using an object
        // if Zwave Node #5 is a dimmer, use class 38:
        // zwave.setValue(5,  38,  1,  0, 50); // 1) passing each individual ValueID constituent:
        // zwave.setValue({ node_id:5, class_id: 38, instance:1, index:0}, 50); // 2) or a valueID object (emitted by ValueAdded event):
        // The 'standard' way to control your devices is by `setValue` which is also the
        // _only_ way to control multi-instance devices, such as the Fibaro FGS-221
        // (double in-wall 2x1,5kw relay) for example:
        // zwave.setValue(8, 37, 1, 0, true); // node 8: turn on 1st relay
        // zwave.setValue(8, 37, 1, 0, false);// node 8: turn off 1st relay
        // zwave.setValue(8, 37, 2, 0, true); // node 8: turn on 2nd relay
        // zwave.setValue(8, 37, 2, 0, false);// node 8: turn off 2nd relay

        return Zwave.setValue(nodeId, classId,  instance,  index,  value);
    }


}

module.exports = new NodeService();
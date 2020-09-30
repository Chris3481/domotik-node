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

    setValue(nodeId, classId) {
        return Zwave.setValue(nodeId, classId,  1,  0,  true);  // node 3: turn on
    }


}

module.exports = new NodeService();
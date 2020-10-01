'use strict';

class Node {

    constructor() {
        this.data = {
            manufacturer:   '',
            manufacturerId: '',
            product:        '',
            productType:    '',
            productId:      '',
            type:           '',
            name:           '',
            loc:            '',
            values:         {},
            ready:          false,
        };
    }

    /**
     * @param nodeInfo
     * @returns {Node}
     */
    setNodeInfo(nodeInfo) {

        Object.assign(this.data, {
            manufacturer:   nodeInfo.manufacturer,
            manufacturerId: nodeInfo.manufacturerid,
            product:        nodeInfo.product,
            productType:    nodeInfo.producttype,
            productId:      nodeInfo.productid,
            type:           nodeInfo.type,
            name:           nodeInfo.name,
            loc:            nodeInfo.loc,
            ready:          true,
        });

        return this;
    }

    /**
     * @returns {boolean}
     */
    isReady() {
        return this.data.ready;
    }

    /**
     * @param valueId
     * @returns {*}
     */
    getValueById(valueId) {

        if (typeof this.data.values[valueId] === 'undefined') {
            return null;
        }

        return this.data.values[valueId];
    }

    /**
     * @returns {*}
     */
    getUserValues() {
        return Object.values(this.data.values).filter(value => value.genre === 'user');
    }

    /**
     * @param value
     * @returns {Node}
     */
    setNodeValue(value) {
        const id = value.value_id;

        this.data.values[id] = value;

        return this;
    }

    /**
     * @param valueId
     * @returns {boolean|null}
     */
    deleteNodeValue(valueId) {

        if (!this.getValueById(valueId)) {
            return null;
        }

        this.data.values.splice(valueId, 1);

       return true;
    }
}

module.exports = Node;
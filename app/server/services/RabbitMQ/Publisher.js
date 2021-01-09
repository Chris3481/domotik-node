'use strict';

require("babel-polyfill");

import moment from 'moment';
import amqp   from 'amqplib';
import config from '../../config/rabbimqConfig';
import logger from "../Logger";



class Publisher {

    constructor() {
        this.chanel = null;
        this.connexion = null;
    }

    /**
     * @returns {Promise<void>}
     */
    async connect() {

        if (!config.enable) {
            return;
        }

        const opt = { credentials: require('amqplib').credentials.plain(config.user, config.password) };

        this.connexion = await amqp.connect('amqp://'+config.host+':'+config.port, opt);

        this.chanel = await this.connexion.createChannel();
    }

    /**
     * @param data
     * @returns {Promise<void>}
     */
    async publishToQueue(data) {

        if (!config.enable) {
            return;
        }

        try {
            if (!this.connexion) {
                await this.connect();
            }

            data.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

            const payload = {
                job:  config.workerName,
                data: data,
            }

            await this.chanel.sendToQueue(config.queueName, new Buffer(JSON.stringify(payload)));

        } catch(error) {
            logger.error('RabbitMq error', {error})
        }
    }
}


module.exports = new Publisher();

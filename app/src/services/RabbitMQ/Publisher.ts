'use strict';

import * as moment from 'moment';
import * as amqp   from 'amqplib';
import {rabbitMqConfig} from '../../config/rabbimqConfig';
import {Logger} from "../Logger";


class RabbitMq {

    private chanel;
    private connexion;

    constructor() {
        this.chanel = null;
        this.connexion = null;
    }

    /**
     * @returns {Promise<void>}
     */
    async connect() {

        if (!rabbitMqConfig.enable) {
            return;
        }

        const opt = { credentials: require('amqplib').credentials.plain(rabbitMqConfig.user, rabbitMqConfig.password) };

        this.connexion = await amqp.connect('amqp://'+rabbitMqConfig.host+':'+rabbitMqConfig.port, opt);

        this.chanel = await this.connexion.createChannel();
    }

    /**
     * @param data
     * @returns {Promise<void>}
     */
    async publishToQueue(data) {

        if (!rabbitMqConfig.enable) {
            return;
        }

        try {
            if (!this.connexion) {
                await this.connect();
            }

            data.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

            const payload = {
                job:  rabbitMqConfig.workerName,
                data: data,
            }

            await this.chanel.sendToQueue(rabbitMqConfig.queueName, new Buffer(JSON.stringify(payload)));

        } catch(error) {
            Logger.error('RabbitMq error', {error})
        }
    }
}


export const rabbitMq = new RabbitMq();

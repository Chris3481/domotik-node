'use strict';

require("babel-core/register");
require("babel-polyfill");

import amqp   from 'amqplib/callback_api';
import config from '../../config/rabbimqConfig';


class Publisher {

   constructor() {
      this.chanel = null;
   }

   /**
    * Connect to rabbitMQ
    */
   connect() {

       const opt = { credentials: require('amqplib').credentials.plain(config.user, config.password) };

       amqp.connect('amqp://'+config.host+':'+config.port, opt, (err, conn) => {

         if (err) {
            console.log(err);
            return false;
         }

         conn.createChannel((err, channel) => {
            this.chanel = channel;
         });
      });
   }

   /**
    * @param queueName
    * @param data
    * @returns {Promise<boolean>}
    */
   async publishToQueue(queueName, data) {

      if (!config.enable) {
         return false;
      }

      if (!this.chanel) {
         let res = this.connect();
         if (!res) {
            return false;
         }
      }

      this.chanel.sendToQueue(queueName, new Buffer(JSON.stringify(data)));
   }
}


module.exports = new Publisher();
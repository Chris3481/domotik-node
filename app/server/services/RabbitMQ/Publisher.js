'use strict';

require("babel-core/register");
require("babel-polyfill");

import moment from 'moment';
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

   disconnect() {
       if (this.chanel) {
           this.chanel.disconnect();
           this.chanel = null;
       }
   }

   /**
    * @param data
    * @returns {Promise<boolean>}
    */
   async publishToQueue(data) {

      if (!config.enable) {
         return false;
      }

      try {
          if (!this.chanel) {
              let res = this.connect();
              if (!res) {
                  return false;
              }
          }

          data.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');

          const payload = {
              job:  config.workerName,
              data: data,
          }

          this.chanel.sendToQueue(config.queueName, new Buffer(JSON.stringify(payload)));

          // this.disconnect();

      } catch(error) {
          console.error(error);
      }
   }
}


module.exports = new Publisher();
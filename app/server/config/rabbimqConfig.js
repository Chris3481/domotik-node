"use strict"

module.exports = {
    enable:     true,
    host:       'rabbitmq',
    port:       5672,
    user:       'rabbit',
    password:   'rabbit',
    queueName:  'default',
    workerName: 'App\\Jobs\\Worker',
};
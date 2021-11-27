"use strict"

export const rabbitMqConfig = {
    enable: false,
    host: 'rabbitmq',
    port: 5672,
    user: 'rabbit',
    password: 'rabbit',
    queueName: 'default',
    workerName: 'App\\Jobs\\Worker',
};
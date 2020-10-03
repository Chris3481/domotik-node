# Domotik-node

### Description

As a mother tongue PHP software developper, I wanted to write my own domotik soft.

I searched for a long time to find a way to interact with a Zwave network.

Finally the best approach that I found is to write a REST API based on node JS.
The purpose of this project is to give a friendly way for third party applications to interact with a zwave network 



### Run the project

This project provides a Docker container with [Node-openzwave](https://github.com/jperkin/node-openzwave) installation 

- git clone 
- cd domotik-node/docker
- docker-compose up -d

**browse http://host-ip:8081/api**

Development mode

```shell script
docker-compose run node-server npm run watch:dev
```


### Configuration

All the configuration is stored in app/server/config

- zwaveConfig.js

`driverPath => The path of the zwave adapter. Default id /dev/ttyACM0`

- apiConfig.js

`port => The port to access the API. default is 8081`


### Endpoints

```shell script
GET /api
```
Get version 

```shell script
GET /api/device/list
```
Get all ready devices in the network

```shell script
GET /api/device/:nodeId/:valueId/set-value/:value
```
Set value for nodeId and valueId

```shell script
GET /api/driver/home-id
```
Get your network home ID

```shell script
GET /api/driver/start-inclusion
```
Start the Inclusion Process to add a Node to the Network.

```shell script
GET /api/driver/start-exclusion
```
Start the Exclusion Process to add a Node to the Network.

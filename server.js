var path 		= require('path');
var express 	= require('express');
var morgan      = require('morgan');
var orm 		= require('sequelize');
var bodyParser  = require('body-parser');
var server 		= express();
var instance = new orm('nrd_hackaton', 'root', 'mysql!nrd!123', {
	dialect: 'mysql',
	host: 'nrd-mysql-db.cbinxfo32p69.us-east-1.rds.amazonaws.com'
});
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({
	extended: true
}));
server.use(bodyParser.json());
server.use(morgan('dev'));

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://52.90.164.168');
client.on('connect', function () {
  client.subscribe('presence/#');
  // client.publish('presence/1', 'Hello mqtt')
});
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(topic.toString())
  console.log(message.toString());
  //client.end()
});
require('./resource/entity')(require('./model/entity')(orm, instance), server);
require('./resource/sensor')(require('./model/sensor')(orm, instance), server);

var typeModel = require('./model/type')(orm, instance);
var typeResource = require('./resource/type')(typeModel, server);

var deviceModel = require('./model/device')(orm, instance);
var deviceResource = require('./resource/device')(deviceModel, server);

var registryModel = require('./model/registry')(orm, instance);
var registryResource = require('./resource/registry')(registryModel, server);

server.listen(8080);
console.log('Server Running');
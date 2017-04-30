var ws      = require('ws');
var mqtt    = require('mqtt')
var path 		= require('path');
var express = require('express');
var morgan  = require('morgan');
var orm 		= require('sequelize');
var bodyParser  = require('body-parser');
var client  = mqtt.connect('mqtt://52.90.164.168');
var server 	= express();
var instance = new orm('nrd_hackaton', 'root', 'mysql!nrd!123', {
	dialect: 'mysql',
	host: 'nrd-mysql-db.cbinxfo32p69.us-east-1.rds.amazonaws.com'
});

// var expressWs = require('express-ws')(server);

server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({
	extended: true
}));
server.use(bodyParser.json());
server.use(morgan('dev'));

// server.ws('/', function(ws, req) {
//   ws.on('message', function(msg) {
//     console.log(msg);
//   });
//   console.log('socket', req.testing);
// });

var wss = new ws.Server({
  port: 8081,
  // server: server
  noServer: true
});

var clts = [];

wss.on('connection', function connection(ws) {
  clts.push(ws);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

wss.broadcast = function(data) {
  for (var i in this.clients)
    this.clients[i].send(data);
};

// // use like this:
// wss.on('connection', function(ws) {
//   console.log(123);
//   ws.on('message', function(message) {
//     wss.broadcast(message);
//   });
// });


client.on('connect', function () {
  client.subscribe('sensor/#');
  client.subscribe('camera/#');
  client.subscribe('matlab/#');
  // client.publish('presence/1', 'Hello mqtt')
});
client.on('message', function (topic, message) {
  var id;
  var array = topic.split('/');
  topic = array[0];
  id = array[1];

  console.log(message.toString());
  clts[0].send(message.toString());
  // for (var i in wss.clients)
  //   this.clients[i].send(message.toString());
  // wss.broadcast(message.toString());

  switch(topic) {
    case 'sensor':
      break;
    case 'camera':
      break;
    case 'matlab':
      break;
  }  
});

server.post('/test', function(req, res) {
  client.publish('sensor/1', 'INTEGRATION');
  res.json({success: true});
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
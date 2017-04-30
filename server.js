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
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({
	extended: true
}));
server.use(bodyParser.json());
server.use(morgan('dev'));

var wss = new ws.Server({
  port: 8081,
  noServer: true
});
var clts = [];
wss.on('connection', function connection(ws) {
  clts.push(ws);
  // Testing pruposes
  ws.send('something');
});
var registryModel = require('./model/registry')(orm, instance);
require('./resource/entity')(require('./model/entity')(orm, instance), server);
require('./resource/sensor')(require('./model/sensor')(orm, instance), server);
require('./resource/entity-sensor')(require('./model/entity-sensor')(orm, instance), server);
client.on('connect', function () {
  client.subscribe('sensors/+/+/soilwet');
  // client.subscribe('camera/#');
  // client.subscribe('matlab/#');
});
client.on('message', function (topic, data) {
  var id;
  var array = topic.split('/');
  switch(array[0]) {
    case 'sensors':
      // imergModel.find({
        
      // }).then(function(response) {
      //   var riskValue = 0;
      //   var object = response.dataValues;
      //   var riskLevelValue = (data*1.5 + object.precipitation)/2;
      //   switch(true) {
      //     case riskLevelValue >= 0 && riskLevelValue <= 2:
      //       riskValue: 0;
      //       break;
      //     case riskLevelValue > 2 && riskLevelValue <= 15:
      //       riskValue: 1;
      //       break;
      //     case riskLevelValue > 15  && riskLevelValue <= 30:
      //       riskValue: 2;
      //       break;
      //     case riskLevelValue > 30 && riskLevelValue <= 60:
      //       riskValue: 3;
      //       break;
      //     case riskLevelValue > 60:
      //       riskValue: 4;
      //       break;
      //   }
      // });
      registryModel.create({
          SOIL_WET: 2, // Calculate this
          PICTURE: '',
          PRECIPITATION: 10, // Calculate this
          LANDSLIDE_RISK_LEVEL: 7, // Calculate this
          ENTITY_ID: array[2]
      }).then(function(response) {
        for (var i = 0; i < clts.length; i += 1)
          clts[i].send(response.dataValues.LANDSLIDE_RISK_LEVEL);
      });
      break;
    // case 'camera':
    //   break;   
  }
});
// server.post('/test', function(req, res) {
//   client.publish('sensor/1', 'INTEGRATION');
//   res.json({success: true});
// });
server.listen(8080);
console.log('Server Running');
var path 		= require('path');
var express 	= require('express');
var morgan      = require('morgan');
var orm 		= require('sequelize');
var bodyParser  = require('body-parser');
var server 		= express();
var router = express.Router();
var instance = new orm('nrd_hackaton', 'root', 'mysql!nrd!123', {
	dialect: 'mysql',
	host: 'nrd-mysql-db.cbinxfo32p69.us-east-1.rds.amazonaws.com'
});

var entityModel = require('./model/entity')(orm, instance);
var entityResource = require('./resource/entity')(entityModel, server);

server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({
	extended: true
}));
server.use(bodyParser.json());
server.use(morgan('dev'));
server.listen(8080);
console.log('Server Running');
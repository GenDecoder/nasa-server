var path 		= require('path');
var express 	= require('express');
var morgan      = require('morgan');
var bodyParser  = require('body-parser');
var server 		= express();
var router = express.Router();
server.use(express.static(path.join(__dirname, 'public')));
server.use(bodyParser.urlencoded({
	extended: true
}));
server.use(bodyParser.json());
server.use(morgan('dev'));
server.listen(80);
console.log('Server Running');
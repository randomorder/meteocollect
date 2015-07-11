// this defines and implements REST API for the /rest/system URL
var configs = require('../configs.json');

var express = require('express');
var winston = require('winston');
var urlParser = require('url');
var moment = require('moment');

var router = express.Router();

// middlewares definition
function logger(req, res, next){
    var now = moment().format(configs['date-format'])
    var method = req.method;
    var url = req.url;
    var pUrl = urlParser.parse(req.url, true);
    var headers = req.headers;

    winston.log('info','[' + now + ']: ' + method + ' /system' + url);
    winston.log('info','[' + now + ']:', {
        method: method,
        pathname: '/system' + pUrl.pathname,
        query: pUrl.query,
        headers: headers
    });
    
    next();
}

router.use([logger]);

// CRUD implementation
router['post']('/', function(req, res){
    res.send('POST received\n');
});
router['get']('/', function(req, res){
    res.send('GET received\n');
});
router['put']('/', function(req, res){
    res.send('PUT received\n');
});
router['delete']('/', function(req, res){
    res.send('DELETE received\n');
});

module.exports = router;
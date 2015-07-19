// this defines and implements REST API for the /rest/system URL
var apiName = '/system';

var configs     = require('../configs');      // load meteocollect general config file.
var bodyParser  = require('body-parser');
var loggers     = require('../utils/loggers');
var logger      = loggers.application;        // define a logger from "application" config.
var urlParser   = require('url');

// Define router for "/system/..." REST API ------------------------------------
var express = require('express');
var router  = express.Router();

// middlewares definition
function logReq(req, res, next){
    var method = req.method;
    var url = req.url;
    var pUrl = urlParser.parse(req.url, true);
    var headers = req.headers;

    logger.log('info', method + ' ' + apiName + url);
    logger.log('verbose','', {
        method: method,
        pathname: apiName + pUrl.pathname,
        query: pUrl.query,
        headers: headers
    });

    next();
}

router.use([logReq]); // set middleware for this submodule

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

// this defines and implements REST API for the /rest/system URL

// load meteocollect general config file.
var configs = require('../configs');
var bodyParser = require('body-parser')

// load logger definitions from configs
var winstonConf = require('winston-config');
winstonConf.fromJson(configs.loggers, function(error, winston) {
    if (error) {
        console.log('error during winston configuration');
        process.exit(1);
    }
});
var winston = require('winston');

// define a logger from "application" config.
var logger = winston.loggers.get('application');

// utility to format date strings
var moment = require('moment');
function now(){
    return moment().format(configs['date-format']);
}
var urlParser = require('url');

// Define router for "/system/..." REST API ------------------------------------
var express = require('express');
var router = express.Router();

// middlewares definition
function logReq(req, res, next){
    var method = req.method;
    var url = req.url;
    var pUrl = urlParser.parse(req.url, true);
    var headers = req.headers;

    logger.log('info','[' + now() + ']: ' + method + ' /system' + url);
    logger.log('verbose','[' + now() + ']:', {
        method: method,
        pathname: '/system' + pUrl.pathname,
        query: pUrl.query,
        headers: headers
    });

    next();
}

router.use([logReq]); // set middleware for this submodule
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

// if USE_TEST_DATA env var defined, load sample data 
if (process.env.USE_TEST_DATA) {
    logger.log('info', 'loading samples...');
    var samples = require('../../test/sample-samples.js').samples;
} else {
    samples = {}
}

// CRUD implementation
router['post']('/', function(req, res){
    res.send('POST received\n' +
        'Parameters: ' +
        JSON.stringify(req.body, null, 2)
        );
});
router['get']('/', function(req, res){
    res.send('GET received\n');
    res.send(samples);
});
router['put']('/', function(req, res){
    res.send('PUT received\n');
});
router['delete']('/', function(req, res){
    res.send('DELETE received\n');
});

module.exports = router;

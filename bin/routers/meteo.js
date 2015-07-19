// this defines and implements REST API for the /rest/meteo URL
var apiName = '/meteo';

var configs     = require('../configs');      // load meteocollect general config file.
var bodyParser  = require('body-parser');
var loggers     = require('../utils/loggers');
var logger      = loggers.application;        // define a logger from "application" config.
var urlParser   = require('url');

// Define router for "/meteo/..." REST API ------------------------------------
var express = require('express');
var router  = express.Router();

var Datastore = require('nedb');
var db = new Datastore({ filename : "./data/datastore", autoload: true});

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
router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

// CRUD implementation
router['post']('/', function(req, res){
    res.send('POST received\n' +
        'Parameters: ' +
        JSON.stringify(req.body, null, 2)
        );
});
router['get']('/', function(req, res){
    queryObj = { };
    db.find(queryObj,function(err, docs) {
        if (err){
            errorMsg = 'Error querying object: ' + JSON.stringify(queryObj, null, 2);
            res.status(500).send({
                error: errorMsg
            });
        }
        else{
            res.send('GET received\n' + JSON.stringify(docs));
        }
    });
});
router['put']('/', function(req, res){
    res.send('PUT received\n');
});
router['delete']('/', function(req, res){
    res.send('DELETE received\n');
});

// any other HTTP methods match here except for HEAD method which matches
// to 'GET' handler. To match HEAD you have define a 'router.head(...)' rule
// before any 'GET' handler definitions.
router.all('/',function(req, res){
    res.status(405).send('Method not allowed\n');
});

module.exports = router;

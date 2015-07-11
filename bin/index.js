// load meteocollect general config file.
var configs = require('./configs');

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

// Meteocollect beginning ------------------------------------------------------
var express = require('express');
var meteocollect = express();

// load "/system/..." REST API
meteocollect.use('/system', require('./routers/system'));

// Meteocollect...
// ...run!!!
try {
    meteocollect.listen(configs.port);
    logger.log('info', '[' + now() + ']: Meteocollect is listening on port ' + configs.port);
} catch (e) {
    logger.log('error', '[' + now()+ ']: Meteocollect listening error on port ' + configs.port, {
        error: e
    });
    process.exit(1);
}

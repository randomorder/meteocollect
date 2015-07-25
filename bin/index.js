var processConf = require('./process-config'); // set configs for this process.
var configs     = require('./configs');        // load meteocollect general config file.
var loggers     = require('./utils/loggers');
var logger      = loggers.application;         // define a logger from "application" config.

// Meteocollect beginning ------------------------------------------------------
var express      = require('express');
var meteocollect = express();


meteocollect.use('/system', require('./routers/system')); // load "/system/..." REST API
meteocollect.use('/meteo' , require('./routers/meteo' )); // load "/meteo/..."  REST API

// Meteocollect...
// ...run!!!
try {
    meteocollect.listen(configs.port);
    logger.log('info', 'Meteocollect is listening on port ' + configs.port);
} catch (e) {
    logger.log('error', 'Meteocollect listening error on port ' + configs.port, {
        error: e
    });
    process.exit(1);
}

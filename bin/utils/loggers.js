var configs = require('../configs');         // load meteocollect general config file.
var moment = require('moment');              // utility to format date strings
var winston = require('winston');
var winstonConf = require('winston-config'); // load logger definitions from configs

winstonConf.fromJson(configs.loggers, function(error, winston) {
    if (error) {
        console.log('error during winston configuration');
        process.exit(1);
    }
});

function now(){
    return moment().format(configs['date-format']);
}

for(var logname in configs.loggers){
    exports[logname] = winston.loggers.get(logname);
    exports[logname].addFilter(function(msg, meta, level){
        return '[' + now() + '] ' + msg;
    });
}

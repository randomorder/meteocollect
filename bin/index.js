var configs = require('./configs.json');

var express = require('express');
var winston = require('winston');
var moment = require('moment');

var meteocollect = express();

meteocollect.use('/system', require('./routers/system'));

var now = moment().format(configs['date-format']);
try{
    meteocollect.listen(configs.port);
    winston.log('info','[' + now + ']: Meteocollect is listening on port ' + configs.port);
} catch (e){
    winston.log('error','[' + now + ']: Meteocollect listening error on port ' + configs.port, {error: e});
    process.exit(1);
}

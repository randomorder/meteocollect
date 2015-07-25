var configs = require('./configs');       // load meteocollect general config file.
var loggers = require('./utils/loggers');
var logger  = loggers.application;        // define a logger from "application" config.

// set a process title
process.title = 'meteocollectd';
logger.log('verbose', 'Process info', {
    uid: process.getuid(),
    gui: process.getgid(),
    pid: process.pid,
    arch: process.arch,
    platform: process.platform,
    title: process.title
});

process.on('SIGINT', function() {
    logger.log('info', 'Meteocollect was stopped by SIGINT.');
    process.exit(0);
});

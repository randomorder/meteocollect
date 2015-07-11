module.exports = {
    // listening post
    "port": 8787,
    // date format used in log messages
    // for info see 'http://momentjs.com/docs/#/displaying/format/''
    "date-format": "YYYY-MM-DD HH:mm:ss.SS",
    "loggers": {
        "application": {
            "console": {
                // possible values are:
                // "silly", "debug", "verbose", "info", "warn", "error"
                "level": "verbose",
                "colorize": true
            }
        }
    }
};

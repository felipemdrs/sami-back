const restify = require('restify');
const logger  = require('morgan');
const bunyan  = require('bunyan');
const path    = require('path');
const log     = bunyan.createLogger({ name: 'sami-back' });

var server = restify.createServer({
  log: log
});

if (process.env.NODE_ENV == 'production') {
  server.use(logger('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: path.join(__dirname, '..', 'morgan.log')}));
} else {
  server.use(logger('dev'));
}

server.pre(restify.pre.sanitizePath());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.requestLogger());
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.bodyParser());

require('./routes')(server);

module.exports = server;

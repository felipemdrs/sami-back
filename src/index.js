const env    = require('./lib/env');
const server = require('./lib/app');
const db     = require('./lib/db');

db.connect();

server.listen(env.PORT || 8081, function() {
  console.log('\n%s listening at %s\n', server.name, server.url);
});

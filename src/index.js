const env    = require('./lib/env');
const server = require('./lib/app');

server.listen(env.PORT, function() {
    console.log('\n%s listening at %s\n', server.name, server.url);
});

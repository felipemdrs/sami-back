const dotenv = require('dotenv');
const fs     = require('fs');
const path   = require('path');

const envConfig = dotenv.parse(fs.readFileSync(path.join(__dirname, '..', '..', '.env')));

for (const e in envConfig) {
  process.env[e] = envConfig[e];
}

module.exports = envConfig;

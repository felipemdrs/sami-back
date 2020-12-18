const dotenv       = require('dotenv');
const fs           = require('fs');
const path         = require('path');

const envFile = path.join(__dirname, '..', '..', '.env');
const envConfig = dotenv.parse(fs.readFileSync(envFile));

for (const e in envConfig) {
  process.env[e] = envConfig[e];
}

module.exports = envConfig;

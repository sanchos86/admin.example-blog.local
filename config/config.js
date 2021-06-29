let config = require('./config.default');

const env = process.env.NODE_ENV;
let envConfig = {};

if (env) {
  const envPath = `./config.${env}`;
  envConfig = require(envPath);
}

module.exports = Object.assign(config, envConfig);

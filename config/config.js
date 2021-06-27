let config = require('./config.default');

const env = process.env.NODE_ENV;
const envPath = `./config.${env}`;

const envConfig = require(envPath);

module.exports = Object.assign(config, envConfig);

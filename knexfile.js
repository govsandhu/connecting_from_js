// Update with your config settings.

const settings = require('./settings');

module.exports = {
  development: {
    client: 'pg',
    connection: {
    user: settings.user,
    password: settings.password,
    database: settings.database,
    hostname: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
    }
  }
};


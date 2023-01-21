const path = require('path');

module.exports = {
  apps: [
    {
      name: 'server',
      script: path.resolve(__dirname, './build/index.js'),
      exec_mode: 'cluster',
      instances: 2,
      error_file: '/var/log/server-err.log',
      out_file: '/var/log/server-out.log',
      log_file: '/var/log/server-combined.log',
      time: true,
    },
  ],
};

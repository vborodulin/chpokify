module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'yarn',
      args: 'start',
      interpreter: '/bin/bash',
      exec_mode: 'cluster',
      instances: 1,
      error_file: '/var/log/frontend-err.log',
      out_file: '/var/log/frontend-out.log',
      log_file: '/var/log/frontend-combined.log',
      time: true,
    },
  ],
};

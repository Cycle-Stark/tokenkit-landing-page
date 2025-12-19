module.exports = {
  apps: [
    {
      name: 'tokenkit_frontend',
      script: 'npm',
      args: 'start',
      cwd: '/home/tokenkit_frontend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};

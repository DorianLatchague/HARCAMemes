module.exports = {
    apps: [
      {
        name: 'Student APIs',
        script: './server.js',
        instances: 0,
        exec_mode: 'cluster',
        watch: true,
        env: {
          NODE_ENV: 'production',
          PORT: '8000'
        }
      }
    ]
  };
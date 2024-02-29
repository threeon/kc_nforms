module.exports = {
  apps: [{
    name: 'CHECKTOOLDEV',
    script: './server.js',
    instances: 1, //0 as max core count
    instance_var: "INSTANCE_ID",
    exec_mode: 'fork',
  }]
}

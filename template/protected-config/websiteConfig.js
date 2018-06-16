/*
 *  This file gets overwritten during production deployments,
 *  using a config file copied from /secure-config/website/overlay.
 */
module.exports = {
  website : {
    protocol: 'http',
    host: 'localhost',
    port: 3002,
  },
  authservice: {
    // application is tooltwist/demo, login with demo/demo
    apikey: 'API1D4710WQG3NXVJQ9S2QHK6R2RS',
    host: 'api.authservice.io',
    port: 80,
    version: 'v2',
  },
  contentservice: {
    apikey: 'API1D4710WQG3NXVJQ9S2QHK6R2RS',
    host: 'uat.crowdhound.io',
    port: 80,
    version: '2.0',
  },
}

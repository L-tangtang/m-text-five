/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
  const config = (exports = {});

  // 白名单
  const write = require('./writeList');
  // 权限接口
  const oprList = require('./oprList');

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1580777733956_3064';

  // add your middleware config here
  config.middleware = [ 'jwtToken', 'oprList' ];
  config.jwtToken = write;
  config.oprList = oprList;
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    mysql: {
      // database configuration
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123321',
        database: 'db_user',
      },
      // load into app, default true
      app: true,
      // load into agent, default false
      agent: false,
    },
    security: {
      csrf: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};

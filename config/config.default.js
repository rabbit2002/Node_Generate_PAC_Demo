'use strict';

const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_1649851372272_2294`;

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    myAppName: 'Generate_PAC_Node',
  };

  config.static = {
    // maxAge: 31536000,
  };

  config.validate = {
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.logger = {
    dir: path.join(appInfo.root, '/log'),
    encoding: 'utf-8',
    level: 'DEBUG',
    disableConsoleAfterReady: false,
    consoleLevel: 'DEBUG',
  };

  // pac setting
  config.pacFileDir = path.join(appInfo.root, '/pacfile/');
  config.proxyDefaultHost = null;
  config.proxyDefaultPort = 9999;

  return {
    ...config, // egg默认配置
    ...userConfig // 用户自定义配置
  };
};

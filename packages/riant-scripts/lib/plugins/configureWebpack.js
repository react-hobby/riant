'use strict';

/**
 * 处理自定义配置 configureWebpack
 *
 * @param {Service} service
 * @param {Object} projectOptions
 */
module.exports = function (service, projectOptions) {
  // 方便查看依赖的全局配置参数
  const { configureWebpack } = projectOptions;

  configureWebpack && service.configureWebpack(configureWebpack);
};

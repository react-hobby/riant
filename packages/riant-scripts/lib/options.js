'use strict';

const Ajv = require('ajv');

const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  $data: true
});
require('ajv-keywords')(ajv, ['instanceof', 'typeof']);

const compiledSchema = ajv.compile({
  title: 'RiantScriptsOptions',
  type: 'object',
  additionalProperties: false,
  properties: {
    alias: { instanceof: ['Function', 'Object'] },
    babelPlugins: { instanceof: ['Function', 'Array'] },
    chainWebpack: { instanceof: 'Function' },
    configureWebpack: { instanceof: 'Function' },
    css: {
      type: 'object',
      properties: {
        sourceMap: { type: 'boolean' },
        loaderOptions: {
          type: 'object',
          properties: {
            css: { type: 'object' },
            less: { type: 'object' },
            stylus: { type: 'object' },
            postcss: { type: 'object' }
          }
        }
      }
    },
    define: { instanceof: ['Function', 'Object'] },
    devServer: { instanceof: ['Function', 'Object'] },
    extensions: { instanceof: ['Function', 'Array'] },
    externals: { instanceof: ['Function', 'Array', 'RegExp', 'Object'] },
    filenameHashing: { type: 'boolean' },
    jest: { instanceof: ['Function', 'Object'] },
    pages: { type: 'object' },
    parallel: { type: ['boolean', 'number'] },
    paths: { instanceof: ['Function', 'Object'] },
    progressBar: { type: ['boolean', 'object'] },
    riantPlugins: { instanceof: 'Array' },
    useEslintrc: { type: 'boolean' }
  }
});

exports.validate = function (resolved, cb) {
  const valid = compiledSchema(resolved);
  !valid && cb && cb(filterErrors(compiledSchema.errors));
};

exports.defaults = () => ({
  css: {
    // sourceMap: false,
    // loaderOptions: {}
  },

  devServer: {
    /*
      open: process.platform === 'darwin',
      host: '0.0.0.0',
      port: 8080,
      https: false,
      hotOnly: false,
      proxy: null, // string | Object
      before: app => {}
    */
  },

  filenameHashing: true, // 默认开启文件hash

  jest(config) {
    return config;
  },

  parallel: false // 默认关闭 thread-loader
});

function filterErrors(errors) {
  let newErrors = [];

  for (const error of errors) {
    const { dataPath } = error;
    let children = [];

    newErrors = newErrors.filter((oldError) => {
      if (oldError.dataPath.includes(dataPath)) {
        if (oldError.children) {
          children = children.concat(oldError.children.slice(0));
        }

        // eslint-disable-next-line no-undefined, no-param-reassign
        oldError.children = undefined;
        children.push(oldError);

        return false;
      }

      return true;
    });

    if (children.length) {
      error.children = children;
    }

    newErrors.push(error);
  }

  return newErrors;
}

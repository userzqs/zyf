/* eslint-disable prefer-destructuring */
const path = require('path')
const proxy_path = 'http://127.0.0.1:8082/' // 线上环境
// const proxy_path = process.env.NODE_ENV === 'prod' ? 'http://120.27.63.240:8082/' : 'http://127.0.0.1:8082/'
module.exports = {
  publicPath: './',
  filenameHashing:false,
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: proxy_path, // 线上环境
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/rest': {
        target: proxy_path, // 线上环境
        changeOrigin: true,
        pathRewrite: {
          '^/rest': '/rest',
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/style/global.scss')
      ]
    },
    'copy-webpack-plugin': {
      ignore: ['arcgis_js_api']
    }
  },
  css: {
    sourceMap: false
  },
  productionSourceMap: false
};

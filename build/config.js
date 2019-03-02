/**
 * Created By shli on 2018/10/12
 */
const path = require('path')
const fs = require('fs')
const nodeExternals = require('webpack-node-externals')
const Components = require('../components.json')
const saladConfig = require('./salad.config.json')

let externals = {}

Object.keys(Components).forEach((key) => {
  externals[`sst-vue-lib/packages/${key}`] = `sst-vue-lib/${key}`
})

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()]

exports.externals = externals

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  'sst-vue-lib': path.resolve(__dirname, '../')
}

exports.jsexculde = /node_modules|utils\/popover\.js|utils\/date.\js/

exports.postcss = (webpack) => {
  saladConfig.features.partialImort = {
    addDependencyTo: webpack
  }
  return [
    require('postcss-salad')(saladConfig)
  ]
}

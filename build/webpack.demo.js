/**
 * Created By shli on 2018/10/23
 */
const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 复制静态资源的插件 复制单个文件或者整个目录到构建目录
const CopyWebpackPlugin = require('copy-webpack-plugin')
// 生成html的插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// CSS文件单独提取出来
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// 显示 webpack 编译进度插件
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// 解析 markdown 文件插件
const md = require('markdown-it')()
// 将 utf-8 格式的字符串 转换成 ASCII 格式
const slugify = require('transliteration').slugify

// 从给定的 html 字符串片段去除 标签片段
const striptags = require('./strip-tags')
const config = require('./config')

console.log('process.env.ENV', process.env.NODE_ENV)

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'
const isPlay = !!process.env.PLAY_ENV
console.log('isDev', isDev)

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, ($0) => {
    //  fromCharCode 从字符编码创建一个字符串。
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16))
  })
  return str
}

const webpackConfig = {
  entry: isProd ? {
    docs: './examples/entry.js',
    'sst-ui': './src/index.js'
  } : (isPlay ? 'examples/play.js' : './examples/entry.js'),
  output: {
    path: path.resolve(process.cwd(), './examples/sst-ui/'),
    publicPath: process.env.CI_ENV || '',
    filename: '[name].[hash:7].js',
    chunkFilename: isProd ? '[name].[hash:7].js' : '[name].js'
  },
  devServer: {
    port: 8085,
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: '/\.jsx?$/',
        exclude: /node_modules|bower_components/,
        loader: 'eslint-loader'
      },
      {
        enforce: 'pre',
        test: /\.vue$/,
        exclude: /node_modules|bower_components/,
        loader: 'eslint-loader'
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexculde,
        loader: 'babel-loader'
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: '/\.html$/',
        loader: 'html-loader?minimize=false'
      },
      {
        test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.svg(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join('static', '[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './examples/index.tpl',
      filename: './index.html',
      favication: './examples/favicon.ico'
    }),
    new CopyWebpackPlugin([
      { from: 'examples/versions.json' }
    ]),
    new ProgressBarPlugin()
  ]
}

if (isDev) {
  webpackConfig.module.rules.push(
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        preserveWhiteSpace: false
      }
    },
    {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader', 'postcss-loader']
    }
  )

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  )
}

module.exports = webpackConfig

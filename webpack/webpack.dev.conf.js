const baseConfig = require('./webpack.base.conf');
const { merge } = require('webpack-merge');
const utils = require('./utils');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
process.env.NODE_ENV = 'development';

module.exports = merge(baseConfig, {
	mode: 'development',
	module: {},
});

const path = require('path');
const utils = require('./utils');
const config = require('./config');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
function resolve(dir) {
	return path.join(__dirname, '..', dir);
}
console.log(resolve('src'));
module.exports = {
	context: path.resolve(__dirname, '../'),
	entry: utils.entries(),
	output: {
		path: config.publicPath,
		filename: '[name].js',
		chunkFilename: '[name].bundle.js',
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
		alias: {
			'@': resolve('src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				include: [resolve('src/pages'), resolve('node_modules/webpack-dev-server/client')],
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: 'url-loader',
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				use: 'url-loader',
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				use: 'url-loader',
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							indentedSyntax: true,
							// sass-loader version >= 8
							sassOptions: {
								indentedSyntax: true,
							},
						},
					},
				],
			},
			{
				test: /\.less$/,
				use: ['vue-style-loader', 'css-loader', 'less-loader'],
			},
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			envConfig: JSON.stringify(process.env.NODE_ENV),
		}),
		new CleanWebpackPlugin(),
		new VueLoaderPlugin(), // vue-loader
	].concat(utils.htmlPlugin()),
};

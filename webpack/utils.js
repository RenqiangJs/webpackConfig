const path = require('path');
const glob = require('glob');
const config = require('./config');
const { merge } = require('webpack-merge');
const ENTRY_PATH = path.resolve(__dirname, '../src/pages');
const PAGE_PATH = path.resolve(__dirname, '../template');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
exports.entries = function () {
	const entryfile = glob.sync(`${ENTRY_PATH}/**/@(main).js`, { matchBase: true });
	const map = {};
	entryfile.forEach(filePath => {
		const relativePath = filePath.split(`${ENTRY_PATH}`);
		let key;
		if (relativePath.length > 1) {
			const relativeKey = relativePath[1].split('/main.js');
			if (relativeKey.length > 1) {
				key = relativeKey[0].replace('/', 'pages.');
			}
		}
		map[key] = filePath;
	});
	return map;
};

exports.htmlPlugin = function () {
	const entries = exports.entries();
	let htmlPluginArr = [];
	for (const entry in entries) {
		let templatePath = `${PAGE_PATH}/index.html`;
		if (fs.existsSync(`${PAGE_PATH}/${entry}.html`)) {
			templatePath = `${PAGE_PATH}/${entry}.html`;
		}
		let filename;
		if (process.env.NODE.ENV === 'production') {
			filename = `${config.publicPath}.ftl`;
		} else {
			filename = `${config.publicPath}/${entry}.html`;
		}
		let conf = {
			template: templatePath,
			filename,
			chunks: ['manifest', 'vendor', entry],
			inject: true,
		};
		if (process.env.NODE.ENV === 'production') {
			conf = merge(conf, {
				minify: {
					removeComments: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
				},
				chunksSortMode: 'dependency',
			});
		}
		htmlPluginArr.push(new HtmlWebpackPlugin(conf));
	}
	return htmlPluginArr;
};

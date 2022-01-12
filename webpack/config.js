const path = require('path');
const fs = require('fs');
// 读取当前文件的绝对路径
const appDirectory = fs.realpathSync(process.cwd() /* 输入命令行的文件路径 */);
const publicPath = path.resolve(appDirectory, './app-resource/src/main/resource');
module.exports = {
	publicPath,
	dev: {
		host: 'loaclhost',
		port: 3000,
	},
	build: {},
};

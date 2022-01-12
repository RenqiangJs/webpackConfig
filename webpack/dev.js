const express = require('express');
const config = require('./config');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.conf');
const app = express();
const port = config.dev.port;
app.use(express.static(config.publicPath));
app.listen(port, () => console.log(`listening on http://localhost:${port},path is ${config.publicPath}`));

const compiler = webpack(webpackConfig);
compiler.watch(
	{
		aggregateTimeout: 300,
		poll: undefined,
	},
	(err, stats) => {
		// Stats Object
		if (err) throw err;
		process.stdout.write(
			`${stats.toString({
				colors: true,
				modules: false,
				children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
				chunks: false,
				chunkModules: false,
			})}\n\n`
		);

		if (stats.hasErrors()) {
			// console.log(stats.toJson());
			console.log('  Build failed with errors.\n');
			process.exit(1);
		}
	}
);

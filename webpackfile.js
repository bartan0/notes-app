const { resolve } = require('path')


module.exports = {
	entry: {
		'main.js': './src/index.js'
	},
	context: resolve(__dirname),
	target: 'web',
	mode: 'development',

	output: {
		path: resolve(__dirname, 'build'),
		filename: '[name]'
	},

	module: { rules: [
		{
			test: /\.js$/,
			loader: 'babel-loader',
			options: {
				presets: [
					[ '@babel/preset-env', {
						targets: '> 1%, not dead'
					} ],
					'@babel/preset-react'
				]
			}
		}, {
			test: /\.html$/,
			use: [
				{
					loader: 'file-loader',
					options: { name: '[name].html' }
				},
				'extract-loader',
				'html-loader'
			]
		}
	] }
}

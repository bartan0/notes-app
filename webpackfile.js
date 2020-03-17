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
		filename: 'static/[name]'
	},

	resolve: {
		alias: {
			'local': resolve(__dirname, 'src'),
			'vendor': resolve(__dirname, 'vendor')
		}
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
				],
				plugins: [
					'@babel/plugin-proposal-class-properties'
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
		}, {
			test: /\.sass$/,
			use: [
				{
					loader: 'file-loader',
					options: { name: 'static/[name].css' }
				},
				'extract-loader',
				'css-loader',
				'sass-loader',
			]
		}
	] }
}

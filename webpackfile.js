const { resolve } = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const CSSPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: {
		main: './src/index.js'
	},
	context: resolve(__dirname),
	target: 'web',
	mode: 'development',

	output: {
		path: resolve(__dirname, 'build'),
		filename: '[name].js'
	},

	resolve: {
		alias: {
			'local': resolve(__dirname, 'src'),
			'vendor': resolve(__dirname, 'vendor')
		}
	},

	plugins: [
		new HTMLPlugin({ template: 'src/index.ejs' }),
		new CSSPlugin
	],

	module: { rules: [
		{
			test: /\.js$/,
			loader: 'babel-loader',
			options: {
				presets: [
					'@babel/preset-react',
					[ '@babel/preset-env', {
						targets: '> 1%, not dead'
					} ],
				],
				plugins: [
					'@babel/plugin-proposal-class-properties'
				]
			}
		}, {
			test: /\.(css|sass)$/,
			use: [
				CSSPlugin.loader,
				'css-loader',
				'sass-loader'
			]
		}, {
			test: /\.(eot|png|svg|ttf|woff|woff2)$/,
			use: 'file-loader'
		}
	] }
}

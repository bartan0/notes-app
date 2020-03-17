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
			test: /\.(eot|png|svg|ttf|woff|woff2)$/,
			use: 'file-loader?name=static/[name].[ext]'
		}
	] }
}

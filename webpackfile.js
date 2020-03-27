const { resolve } = require('path')
const { DefinePlugin } = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const CSSPlugin = require('mini-css-extract-plugin')

const getConfig = require('./scripts/generate-config')


module.exports = async (
	env,
	{ mode }
) => {
	const isProduction = mode === 'production'

	const buildConfig = await getConfig({
		configPath: resolve(__dirname, isProduction
			? 'config.prod.json'
			: 'config.dev.json'
		)
	})

	return {
		entry: {
			main: './src/index.js'
		},
		context: resolve(__dirname),
		target: 'web',
		mode,

		output: {
			path: resolve(__dirname, 'build'),
			filename: isProduction
				? '[contenthash].js'
				: '[name].js'
		},

		resolve: {
			alias: {
				'local': resolve(__dirname, 'src'),
				'vendor': resolve(__dirname, 'vendor')
			}
		},

		plugins: [
			new DefinePlugin({ ...buildConfig.env }),
			new HTMLPlugin({ template: 'src/index.ejs' }),
			new CSSPlugin({ filename: isProduction
				? '[contenthash].css'
				: '[name].css'
			})
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
}

const { existsSync, readFileSync, writeFileSync } = require('fs')
const { createInterface } = require('readline')


// Ensure the value may safely be used by Webpack DefinePlugin
const forDefinePlugin = value => JSON.stringify(value)


const getConfig = async iface => {
	const question = (msg, dflt) => new Promise(resolve =>
		iface.question(
			`${msg}${dflt ? ` [${dflt}]` : ''}: `,
			value => resolve(value || dflt || null)
		)
	)

	return {
		env: {
			_GAPI_CLIENT_ID: forDefinePlugin(await question('Google API client ID')),
			_GSERVICE_DB_FILENAME: forDefinePlugin(await question('Google Drive database file name', '_dev_database'))
		}
	}
}


module.exports = async ({ configPath }) => {
	if (existsSync(configPath))
		return JSON.parse(readFileSync(configPath))

	console.info('Configuration file does not exist - it will be created now')

	const iface = createInterface({ input: process.stdin, output: process.stdout })
	const config = await getConfig(iface)

	iface.close()
	writeFileSync(configPath, JSON.stringify(config, null, '\t'))
	console.info(`Configuration file saved to ${configPath}`)

	return config
}

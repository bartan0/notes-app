const { spawn } = require('child_process')
const config = require('../config.prod.json')

const isDryRun = config.deploy.DRY_RUN


const error = (msg, err) => {
	console.error([ 'Error', msg, (err || '').toString() ]
		.filter(Boolean)
		.join(': ')
	)
	process.exit(1)
}


console.info(`Starting deploy${isDryRun ? ' (DRY RUN)' : ''}...`)

spawn('az', [
	'storage', 'blob', 'upload-batch',
	'--source',      './build',
	'--destination', config.deploy.AZURE_STORAGE_DESTINATION,
	...(isDryRun ? [ '--dryrun' ] : [])
], {
	stdio: 'inherit',
	env: {
		...process.env,
		AZURE_STORAGE_ACCOUNT: config.deploy.AZURE_STORAGE_ACCOUNT,
		AZURE_STORAGE_KEY: config.deploy.AZURE_STORAGE_KEY
	}
})
	.on('error', err => error('Unable to launch deploy process', err))
	.on('exit', (code, signal) => {
		if (signal)
			error('Deploy process terminated by signal', signal)

		if (code)
			error('Deploy process finished with error', code)

		console.info('Deploy done')
	})

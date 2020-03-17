const { dependencies, devDependencies } = require('../package.json')

const getCmd = dev => `npm i ${
	dev ? '-D' : ''
} ${
	Object.keys(dev ? devDependencies : dependencies).map(dep => `${dep}@latest`).join(' ')
}`

process.stdout.write(`${
	getCmd()
}\n${
	getCmd(true)
}\n`)

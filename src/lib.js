const uuid = require('uuid/v4')

module.exports = {
	ID: () => '_' + uuid().replace(/-/g, ''),
	PromiseResolve: (...args) => new Promise(r => r(...args))
}

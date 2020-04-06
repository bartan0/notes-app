const Cache = require('local/cache')

const cache = new Cache

module.exports = GService => Object.assign({},
	require('./use-gservice')(GService, cache),
	require('./with-gservice')(GService, cache)
)

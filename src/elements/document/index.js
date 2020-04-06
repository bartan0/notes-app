require('./transformers')

module.exports = {
	Component: require('./component'),
	actions: [
		{ label: 'Example', action: doc => console.log('example', document) }
	]
}

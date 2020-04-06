module.exports = {
	Component: require('./component'),
	actions: [
		{ label: '+', action: steplist => steplist.addStep() }
	]
}

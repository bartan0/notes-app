module.exports = {
	Component: require('./component'),
	actions: [
		{ label: '+', action: checklist => checklist.addItem() }
	]
}

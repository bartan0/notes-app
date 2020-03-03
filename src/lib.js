const uuid = require('uuid/v4')

module.exports = {
	ID: () => '_' + uuid().replace(/-/g, ''),
	PromiseResolve: (...args) => new Promise(r => r(...args)),

	bindModel: Component => ({
		model: renderable,
		...props
	}) => {
		const [ model, updateModel ] = useState(() => renderable.getModel())

		useEffect(() => {
			renderable.on('update', () => updateModel(renderable.getModel()))
		}, [])

		return React.createElement(Component, {
			model,
			...props
		})
	}
}

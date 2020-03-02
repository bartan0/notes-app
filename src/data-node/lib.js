const GService = require('local/gservice')

module.exports = DataNode => {
	DataNode._instantiateNodes = function (indexes) {
		return GService.getNodes(indexes, true)
			.then(children => children.map(({ id, index, childIndexes, type, data }) => {
				const node = new this

				node.id = id
				node.index = index
				node.type = type
				node.childrenIndexes = childIndexes

				node.fromArray(data)

				return node
			}))
	}
}

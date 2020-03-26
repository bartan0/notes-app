const { useEffect } = require('react')
const { NodeType } = require('local/const')
const Note = require('./note')

const Root = ({
	nodes,
	append,
	loadNodes
}) => {
	useEffect(() => { loadNodes() }, [])

	return nodes
}

Root.subconsumers = { [NodeType.NOTE]: Note }
module.exports = Root

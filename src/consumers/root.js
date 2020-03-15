const { createElement, useEffect } = require('react')
const { NodeType, NodeData } = require('local/const')
const NotesView = require('local/ui/notes-view')
const Note = require('./note')

const Root = ({
	nodes,
	append,
	loadNodes
}) => {
	useEffect(() => { loadNodes() }, [])

	return createElement(NotesView, {
		notes: nodes,
		append: () => append(NodeType.NOTE, NodeData[NodeType.NOTE])
	})
}

Root.subconsumers = { [NodeType.NOTE]: Note }
module.exports = Root

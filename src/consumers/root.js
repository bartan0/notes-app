const { createElement, useEffect } = require('react')
const { NodeType, NodeData } = require('local/const')
const Note = require('./note')
const NotesView = require('local/ui/notes-view')

const Root = ({
	nodes,
	loadNodes,
	append,
	save
}) => {
	useEffect(() => { loadNodes() }, [])

	return createElement(NotesView, {
		notes: nodes,
		addNote: () => append(NodeType.NOTE, NodeData[NodeType.NOTE], {
			autoSave: true
		})
	})
}

Root.subconsumers = { [NodeType.NOTE]: Note }
module.exports = Root

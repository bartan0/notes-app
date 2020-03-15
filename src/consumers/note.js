const { createElement, useEffect } = require('react')
const { NodeType, NodeData } = require('local/const')
const NoteView = require('local/ui/note')

const subconsumers = {
	[NodeType.CHECKLIST]: require('./checklist'),
	[NodeType.DOCUMENT]: require('./document')
}


const Note = ({
	data,
	subnodes,
	update,
	append,
	save,
	loadSubnodes
}) => {
	const [ name = '' ] = data

	useEffect(() => { loadSubnodes() }, [])

	return createElement(NoteView, {
		name,
		components: subnodes,
		setName: name => update([ name ]),
		append: type => append(type, NodeData[type]),
		save: () => save(true)
	})
}

Note.subconsumers = subconsumers
module.exports = Note

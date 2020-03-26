const { createElement, useEffect } = require('react')
const { useRouteMatch } = require('react-router')
const { NodeType } = require('local/const')
const NoteSummary = require('local/ui/note-summary')
const FullNoteView = require('local/ui/full-note-view')

const subconsumers = {
	[NodeType.CHECKLIST]: require('./checklist'),
	[NodeType.DOCUMENT]: require('./document')
}


const Note = ({
	id,
	data,
	subnodes,
	loadSubnodes
}) => {
	const [ name = '' ] = data
	const { params } = useRouteMatch([
		'/notes',
		'/note/:id'
	])

	useEffect(() => {
		if (params.id === id)
			loadSubnodes()
	}, [ params.id ])

	return params.id
		? params.id === id
			? createElement(FullNoteView, {
				name,
				components: subnodes
			})
			: null
		: createElement(NoteSummary, {
			id,
			name
		})
}

Note.subconsumers = subconsumers
module.exports = Note

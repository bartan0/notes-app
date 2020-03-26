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

	if (!params.id)
		return createElement(NoteSummary, {
			id,
			name
		})

	if (params.id !== id)
		return null

	useEffect(() => { loadSubnodes() }, [])

	return createElement(FullNoteView, {
		name,
		components: subnodes
	})
}

Note.subconsumers = subconsumers
module.exports = Note

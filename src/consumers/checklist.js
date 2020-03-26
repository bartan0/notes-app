const { createElement, useEffect } = require('react')
const { NodeType, NodeData } = require('local/const')
const ChecklistItem = require('./checklist-item')
const ChecklistView = require('local/ui/checklist-view')

const subconsumers = { [NodeType.CHECKLIST_ITEM]: ChecklistItem }


const Checklist = ({
	data,
	subnodes,
	loadSubnodes,
	update,
	append
}) => {
	const [ content = '' ] = data

	useEffect(() => { loadSubnodes() }, [])

	return createElement(ChecklistView, {
		content,
		items: subnodes,
		setContent: content => update([ content ]),
		addItem: () => append(NodeType.CHECKLIST_ITEM, NodeData[NodeType.CHECKLIST_ITEM])
	})
}

Checklist.subconsumers = subconsumers
module.exports = Checklist

const { createElement, useEffect } = require('react')
const { NodeType, NodeData } = require('local/const')
const ChecklistView = require('local/ui/checklist')
const ChecklistItem = require('./checklist-item')

const subconsumers = { [NodeType.CHECKLIST_ITEM]: ChecklistItem }


const Checklist = ({
	data,
	subnodes,
	update,
	append,
	loadSubnodes
}) => {
	const [ content = '' ] = data

	useEffect(() => { loadSubnodes() }, [])

	return createElement(ChecklistView, {
		content,
		items: subnodes,
		setContent: content => update([ content ]),
		append: () => append(NodeType.CHECKLIST_ITEM, NodeData[NodeType.CHECKLIST_ITEM])
	})
}

Checklist.subconsumers = subconsumers
module.exports = Checklist

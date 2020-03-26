const { createElement, useEffect } = require('react')
const { NodeType } = require('local/const')
const ChecklistItem = require('./checklist-item')
const ChecklistView = require('local/ui/checklist-view')

const subconsumers = { [NodeType.CHECKLIST_ITEM]: ChecklistItem }


const Checklist = ({
	data,
	subnodes,
	loadSubnodes
}) => {
	const [ content = '' ] = data

	useEffect(() => { loadSubnodes() }, [])

	return createElement(ChecklistView, {
		content,
		items: subnodes
	})
}

Checklist.subconsumers = subconsumers
module.exports = Checklist

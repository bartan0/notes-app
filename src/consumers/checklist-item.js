const { createElement } = require('react')
const ItemView = require('local/ui/checklist-item')


const ChecklistItem = ({
	data,
	update
}) => {
	const done = +data[0] || 0
	const content = data[1] || ''

	return createElement(ItemView, {
		done: !!done,
		content,
		toggle: _done => update([ typeof _done === 'boolean' ? +_done : 1 - done, content ]),
		setContent: content => update([ done, content ])
	})
}

ChecklistItem.subconsumers = {}
module.exports = ChecklistItem

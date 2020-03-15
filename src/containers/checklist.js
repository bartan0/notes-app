const { isDefined } = require('local/lib')


const ChecklistItem = render => ({
	order,
	data,
	update,
	remove
}) => {
	const done = +data[0] || 0
	const content = data[1] || ''

	const toggle = _done => typeof _done === 'boolean'
		? update([ +_done, content ])
		: update([ 1 - done, content ])

	return render({
		done: !!done,
		content,
		order,
		toggle,
		setContent: content => update([ done, content ]),
		remove
	})
}

ChecklistItem.TYPE = 'CHECKLIST_ITEM'
ChecklistItem.DEFAULT = [ 0, 'New item' ]


const Checklist = render => ({
	data,
	subnodes,
	update,
	append,
	remove,
	load,
	save
}) => {
	const [ content = '' ] = data

	return render({
		content,
		items: renderer => subnodes(ChecklistItem(renderer), true),
		setContent: content => update([ content ]),
		append: () => append(ChecklistItem.TYPE, ChecklistItem.DEFAULT),
		save: () => save(true)
	})
}

Checklist.TYPE = 'CHECKLIST'
module.exports = Checklist

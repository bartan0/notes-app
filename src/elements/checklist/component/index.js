const React = require('react')
const EditableLabel = require('local/ui/editable-label')
const { useGService } = require('local/gservice')

const ChecklistElementItem = require('./item')

require('./style.sass')

const C = 'checklist'


const ChecklistElement = ({
	nodePath
}) => {
	const [
		items,
		itemsStatus,
		checklist,
		checklistStatus
	] = useGService(`${nodePath}/`)

	return checklist ?
		<div className={C}>
			<EditableLabel
				value={checklist.name}
				onUpdate={name => checklist.setName(name)}
				actionsRight={[
					{
						icon: 'plus',
						title: 'Add Item',
						action: () => checklist.addItem()
					}, {
						icon: 'chevron-up',
						title: 'Move Up',
						action: () => checklist.reorder(-1)
					}, {
						icon: 'chevron-down',
						title: 'Move Down',
						action: () => checklist.reorder(1)
					}, {
						icon: 'ban',
						title: 'Remove Checklist',
						action: () => checklist.remove()
					}
				]}
			/>

			<div className={C + '__items'}>
				{items.map(({ id }) =>
					<ChecklistElementItem key={id} nodePath={`${nodePath}/${id}`}/>
				)}
			</div>
		</div>
	:
		null
}

module.exports = ChecklistElement

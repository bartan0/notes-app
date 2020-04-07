const React = require('react')
const EditableLabel = require('local/ui/editable-label')
const { useGService } = require('local/gservice')

const ChecklistElementItem = require('./item')


const ChecklistElement = ({
	nodePath,
	showToolbar
}) => {
	const [
		items,
		itemsStatus,
		checklist,
		checklistStatus
	] = useGService(`${nodePath}/`)

	return checklist ?
		<div>
			<div>
				{showToolbar &&
					<div>
						<button onClick={() => checklist.addItem()}>+ Item</button>
					</div>
				}

				<EditableLabel value={checklist.name} onUpdate={name => checklist.setName(name)}/>
			</div>

			<div>
				{items.map(({ id }) =>
					<ChecklistElementItem key={id} nodePath={`${nodePath}/${id}`}/>
				)}
			</div>
		</div>
	:
		null
}

module.exports = ChecklistElement

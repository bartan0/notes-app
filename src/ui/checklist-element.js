const React = require('react')
const ChecklistElementItem = require('local/ui/checklist-element-item')
const { useGService } = require('local/containers/gservice')


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

				<input defaultValue={checklist.name} onBlur={({ target: t }) => checklist.setName(t.value)}/>
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

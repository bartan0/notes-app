const React = require('react')
const EditableLabel = require('local/ui/editable-label')
const Icon = require('local/ui/icon')
const { useGService } = require('local/gservice')

require('./item.sass')

const C = 'steplist-item'


const SteplistItem = ({ nodePath, onSetActive }) => {
	const [ step, stepStatus ] = useGService(nodePath)

	return step ?
		<div className={C}>
			{step.active &&
				<Icon className={`${C}-active-mark`} name="chevron-right"/>
			}

			<EditableLabel
				className={`${C}-label`}
				value={step.content}
				actionsRight={[
					{
						icon: 'check',
						title: 'Mark as Active',
						action: () => onSetActive(step.id)
					}, {
						icon: 'chevron-up',
						title: 'Move Up',
						action: () => step.reorder(-1)
					}, {
						icon: 'chevron-down',
						title: 'Move Down',
						action: () => step.reorder(1)
					}, {
						icon: 'ban',
						title: 'Remove Checklist',
						action: () => step.remove()
					}
				]}
				onUpdate={content => step.setContent(content)}
			/>
		</div>
	:
		<div>
			Loading...
		</div>
}

module.exports = SteplistItem

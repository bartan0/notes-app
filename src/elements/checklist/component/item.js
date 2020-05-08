const React = require('react')
const EditableLabel = require('local/ui/editable-label')
const { useGService } = require('local/gservice')
const Icon = require('local/ui/icon')
const classNames = require('classnames')

require('./item.sass')

const C = 'checklist-element-item'


const ChecklistElementItem = ({ nodePath }) => {
	const [ item ] = useGService(nodePath)

	return item ?
		<div className={classNames(C, {
			[`${C}--done`]: item.done,
			[`${C}--not-done`]: !item.done
		})}>
			{item.done &&
				<Icon className={`${C}-icon`} name="check"/>
			}
			<EditableLabel
				className={`${C}-label`}
				actionsRight={[
					{
						icon: item.done ? 'minus' : 'check',
						title: item.done ? 'Mark as not done' : 'Mark as done',
						action: () => item.toggle()
					}, {
						icon: 'chevron-up',
						title: 'Move Up',
						action: () => item.reorder(-1)
					}, {
						icon: 'chevron-down',
						title: 'Move Down',
						action: () => item.reorder(1)
					}, {
						icon: 'ban',
						title: 'Remove Item',
						action: () => item.remove()
					}
				]}
				value={item.content}
				onUpdate={content => item.setContent(content)}
			/>
		</div>
	:
		null
}

module.exports = ChecklistElementItem

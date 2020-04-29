const React = require('react')
const EditableLabel = require('local/ui/editable-label')
const { useGService } = require('local/gservice')
const Icon = require('local/ui/icon')

require('./item.sass')

const C = 'checklist-element-item'


const ChecklistElementItem = ({ nodePath }) => {
	const [ item ] = useGService(nodePath)

	return item ?
		<div className={C}>
			{item.done &&
				<Icon className={`${C}-icon`} name="check"/>
			}
			<EditableLabel
				className={`${C}-label`}
				actionsRight={[
					{
						icon: 'times',
						title: 'Remove Item',
						action: () => item.remove()
					},
					{
						icon: item.done ? 'minus' : 'check',
						title: item.done ? 'Mark as not done' : 'Mark as done',
						action: () => item.toggle()
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

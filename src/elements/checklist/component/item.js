const React = require('react')
const EditableLabel = require('local/ui/editable-label')
const { useGService } = require('local/gservice')


const ChecklistElementItem = ({ nodePath }) => {
	const [ item ] = useGService(nodePath)

	return item ?
		<div>
			<EditableLabel
				actionsRight={[ {
					icon: 'times',
					action: () => item.remove()
				} ]}
				value={item.content}
				onUpdate={content => item.setContent(content)}
			/>
		</div>
	:
		null
}

module.exports = ChecklistElementItem

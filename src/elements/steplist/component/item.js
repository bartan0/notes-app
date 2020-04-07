const React = require('react')
const EditableLabel = require('local/ui/editable-label')
const { useGService } = require('local/gservice')


const SteplistItem = ({ nodePath, onSetActive }) => {
	const [ step, stepStatus ] = useGService(nodePath)

	return step ?
		<li>
			<button onClick={() => step.remove()}>X</button>
			<button onClick={() => onSetActive(step.id)}>!</button>
			{step.active ? '>>>' : ''}
			<EditableLabel value={step.content} onUpdate={content => step.setContent(content)}/>
		</li>
	:
		<li>
			Loading...
		</li>
}

module.exports = SteplistItem

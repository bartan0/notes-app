const React = require('react')
const DynamicLabel = require('local/ui/dynamic-label')
const { useGService } = require('local/containers/gservice')


const SteplistItem = ({ nodePath, onSetActive }) => {
	const [ step, stepStatus ] = useGService(nodePath)

	return step ?
		<li>
			<button onClick={() => step.remove()}>X</button>
			<button onClick={() => onSetActive(step.id)}>!</button>
			{step.active ? '>>>' : ''}
			<DynamicLabel content={step.content} onUpdate={content => step.setContent(content)}/>
		</li>
	:
		<li>
			Loading...
		</li>
}


module.exports = SteplistItem

const React = require('react')
const { useGService } = require('local/containers/gservice')


const SteplistItem = ({ nodePath, onSetActive }) => {
	const [ step, stepStatus ] = useGService(nodePath)

	return step ?
		<li>
			<button onClick={() => step.remove()}>X</button>
			<button onClick={() => onSetActive(step.id)}>
				{step.active ? '>>> ' : ''}
				{step.content}
			</button>
		</li>
	:
		<li>
			Loading...
		</li>
}


module.exports = SteplistItem

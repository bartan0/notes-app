const React = require('react')
const DynamicLabel = require('local/ui/dynamic-label')
const { useGService } = require('local/containers/gservice')


const ChecklistElementItem = ({ nodePath }) => {
	const [ item ] = useGService(nodePath)

	return item ?
		<div>
			<button onClick={() => item.remove()}>X</button>
			<DynamicLabel content={item.content} onUpdate={content => item.setContent(content)}/>
		</div>
	:
		null
}

module.exports = ChecklistElementItem

const React = require('react')
const { useGService } = require('local/containers/gservice')


const ChecklistElementItem = ({ nodePath }) => {
	const [ item ] = useGService(nodePath)

	return item ?
		<div>
			<button onClick={() => item.remove()}>X</button>
			<input type="checkbox" checked={item.done} onChange={() => item.toggle()}/>
			<input defaultValue={item.content} onBlur={({ target: t }) => item.setContent(t.value)}/>
		</div>
	:
		null
}

module.exports = ChecklistElementItem

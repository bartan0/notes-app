const React = require('react')
const { useGService } = require('local/containers/gservice')

const DocumentElement = ({ nodePath }) => {
	const [ document ] = useGService(nodePath)

	return document ?
		<div>
			<textarea defaultValue={document.content} onBlur={({ target: t }) => document.setContent(t.value)}/>
		</div>
	:
		null
}

module.exports = DocumentElement

const React = require('react')
const { useGService } = require('local/containers/gservice')
const { markdown } = require('local/lib')

const { useState } = React

// Values are meaningful
const Mode = {
	EDIT: 0,
	SHOW: 1
}


const DocumentElement = ({ nodePath }) => {
	const [ document, documentStatus ] = useGService(nodePath)
	const [ mode, setMode ] = useState(Mode.SHOW)

	const update = content => {
		setMode(1 - mode)
		document.setContent(content)
	}


	return document ?
		<div>
			<div>
				<button onClick={() => setMode(1 - mode)}>
					{mode === Mode.EDIT ?
						'Show'
					:
						'Edit'
					}
				</button>
			</div>

			{mode === Mode.SHOW ?
				<div
					dangerouslySetInnerHTML={{ __html: markdown(document.content) }}
					onClick={() => setMode(1 - mode)}
				/>
			:
				<textarea
					defaultValue={document.content}
					onBlur={({ target: t }) => update(t.value)}
				/>
			}
		</div>
	:
		null
}

module.exports = DocumentElement

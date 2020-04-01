const React = require('react')
const { useGService } = require('local/containers/gservice')
const { markdown } = require('local/lib')

const { useEffect, useRef, useState } = React

// Values are meaningful
const Mode = {
	EDIT: 0,
	SHOW: 1
}


const DocumentElement = ({
	nodePath,
	showToolbar
}) => {
	const textareaRef = useRef()
	const [ document, documentStatus ] = useGService(nodePath)
	const [ mode, setMode ] = useState(Mode.SHOW)

	const toggleMode = () => setMode(1 - mode)
	const update = content => {
		setMode(Mode.SHOW)
		document.setContent(content)
	}


	useEffect(() => {
		if (mode === Mode.EDIT)
			textareaRef.current.focus()
	}, [
		mode
	])


	return document ?
		<div>
			{showToolbar &&
				<div>
					<button onClick={() => setMode(1 - mode)}>
						{mode === Mode.EDIT ?
							'Show'
						:
							'Edit'
						}
					</button>
				</div>
			}

			{mode === Mode.SHOW ?
				<div
					tabIndex="0"
					onFocus={() => setMode(Mode.EDIT)}
					dangerouslySetInnerHTML={{ __html: markdown(document.content) }}
				/>
			:
				<textarea
					ref={textareaRef}
					defaultValue={document.content}
					onBlur={({ target: t }) => update(t.value)}
				/>
			}
		</div>
	:
		null
}

module.exports = DocumentElement

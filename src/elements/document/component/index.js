require('./style.sass')

const React = require('react')
const ButtonGroup = require('local/ui/button-group')
const { useGService } = require('local/gservice')
const { bem, markdown } = require('local/lib')
const { withMouseHover } = require('local/lib/react')

const { useEffect, useRef, useState } = React

// Values are meaningful
const Mode = {
	EDIT: 0,
	SHOW: 1
}


const DocumentElement = withMouseHover(({
	mouseHover,
	nodePath
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
		if (mode === Mode.EDIT) {
			const cursorPos = document.content.length

			textareaRef.current.focus()
			textareaRef.current.setSelectionRange(cursorPos, cursorPos)
		}
	}, [
		mode
	])


	return document ?
		<div className={bem('document-element')}>
			{mode === Mode.SHOW ?
				<div
					tabIndex="0"
					className={bem('document-element', 'content', 'show')}
					onFocus={() => setMode(Mode.EDIT)}
					dangerouslySetInnerHTML={{ __html: markdown(document.content) }}
				/>
			:
				<div className={bem('document-element', 'content', 'edit')}>
					<textarea
						ref={textareaRef}
						cols={80}
						rows={20}
						defaultValue={document.content}
						onBlur={({ target: t }) => update(t.value)}
					/>
				</div>
			}

			{mode === Mode.SHOW && mouseHover &&
				<ButtonGroup
					className={bem('document-element', 'toolbar')}
					actions={[
						{ icon: 'edit', title: 'Edit Document', action: () => setMode(Mode.EDIT) },
						{ icon: 'ban', title: 'Remove Document', action: () => document.remove() }
					]}
				/>
			}
		</div>
	:
		null
})

module.exports = DocumentElement

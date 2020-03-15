const React = require('react')

const Document = ({
	Mode,
	mode,
	content,
	setContent,
	toggleMode
}) => {
	const editor = React.useRef()

	switch (mode) {

		case Mode.EDIT:
			return (
				<div>
					<div>
						<button onClick={() => {
							setContent(editor.current.value)
							toggleMode()
						}}>
							Accept
						</button>
					</div>

					<div>
						<textarea
							ref={editor}
							defaultValue={content}
						/>
					</div>
				</div>
			)

		case Mode.VIEW:
			return (
				<div>
					<div>
						<button onClick={toggleMode}>Edit</button>
					</div>

					{content}
				</div>
			)
	}
}

module.exports = Document

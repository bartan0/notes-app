const React = require('react')
const { Mode } = require('local/containers').Document

const { useRef } = React


const Document = ({
	mode,
	switchMode,
	content,
	update,
	load
}) => {
	const editorRef = useRef()
	const _update = () => update(editorRef.current.value)

	return (
		<div>
			<div>
				<button onClick={() => {
					if (mode === Mode.EDIT)
						_update()
					switchMode()
				}}>
					{{
						[Mode.EDIT]: 'PREVIEW',
						[Mode.VIEW]: 'EDIT'
					}[mode]}
				</button>
			</div>

			{{
				[Mode.EDIT]:
					<div>
						<textarea
							ref={editorRef}
							defaultValue={content}
						/>
					</div>
				,
				[Mode.VIEW]: content
			}[mode]}
		</div>
	)
}


module.exports = Document

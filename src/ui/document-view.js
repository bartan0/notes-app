const React = require('react')
const {
	Button,
	Form,
	Segment,
	TextArea
} = require('semantic-ui-react')

const { useRef } = React


const DocumentView = ({
	Mode,
	mode,
	content,
	toggleMode,
	setContent
}) => {
	const ref = useRef()

	return (
		<Segment>
			<Button.Group buttons={[
				{
					key: 'toggle-mode',
					icon: {
						[Mode.EDIT]: 'eye',
						[Mode.VIEW]: 'pencil'
					}
						[mode],
					onClick: () => {
						if (mode === Mode.EDIT)
							setContent(ref.current.value)
						toggleMode()
					}
				}
			]}/>

			{mode === Mode.EDIT ?
				<Form>
					<TextArea
						as={() =>
							<textarea
								ref={ref}
								defaultValue={content}
								style={{
									fontFamily: 'monospace'
								}}
							/>
						}
						rows={15}
						onBlur={() => setContent(ref.current.value)}
					/>
				</Form>
			:
				content
			}
		</Segment>
	)
}

module.exports = DocumentView

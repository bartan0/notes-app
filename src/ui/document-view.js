const React = require('react')
const {
	Button,
	Form,
	Segment,
	TextArea
} = require('semantic-ui-react')


const DocumentView = ({
	Mode,
	mode,
	content,
	toggleMode
}) =>
	<Segment>
		<Button.Group buttons={[
			{
				key: 'toggle-mode',
				icon: {
					[Mode.EDIT]: 'eye',
					[Mode.VIEW]: 'pencil'
				}
					[mode],
				onClick: toggleMode
			}
		]}/>

		{mode === Mode.EDIT ?
			<Form>
				<TextArea
					rows={15}
					value={content}
				/>
			</Form>
		:
			content
		}
	</Segment>

module.exports = DocumentView

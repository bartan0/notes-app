const React = require('react')
const { useRouteMatch } = require('react-router')
const {
	Button,
	Segment
} = require('semantic-ui-react')


const NotesView = ({
	notes,
	addNote
}) => {
	const { params } = useRouteMatch([
		'/notes',
		'/note/:id'
	])

	return (
		<Segment>
			{!params.id &&
				<Button.Group buttons={[
					{
						key: 'note',
						icon: 'sticky note outline',
						content: 'Add Note',
						onClick: addNote
					}
				]}/>
			}

			{notes}
		</Segment>
	)
}

module.exports = NotesView

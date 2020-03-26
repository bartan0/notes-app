const React = require('react')
const { useHistory } = require('react-router')
const {
	Button,
	Input,
	Segment
} = require('semantic-ui-react')


const FullNoteView = ({
	name,
	setName,
	components,
	save,
	addChecklist,
	addDocument
}) => {
	const history = useHistory()

	return (
		<Segment>
			<Input fluid value={name} onChange={({ target: t }) => setName(t.value)}/>

			<Button.Group buttons={[
				[ 'back', 'chevron left', () => history.goBack() ],
				[ 'save', 'save', save  ],
				[ 'document', 'align left', addDocument ],
				[ 'checklist', 'tasks', addChecklist ]
			]
				.map(([ key, icon, onClick ]) => ({ key, icon, onClick }))
			}/>

			{components}
		</Segment>
	)
}

module.exports = FullNoteView

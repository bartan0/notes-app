const React = require('react')
const {
	Header,
	Segment
} = require('semantic-ui-react')


const FullNoteView = ({
	name,
	components
}) =>
	<Segment>
		<Header content={name}/>

		{components}
	</Segment>

module.exports = FullNoteView

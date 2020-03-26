const React = require('react')
const {
	Header,
	List,
	Segment
} = require('semantic-ui-react')


const ChecklistView = ({
	content,
	items
}) =>
	<Segment>
		<Header content={content}/>

		<List>
			{items}
		</List>
	</Segment>

module.exports = ChecklistView

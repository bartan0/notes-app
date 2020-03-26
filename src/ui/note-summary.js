const React = require('react')
const { Card } = require('semantic-ui-react')
const { Link } = require('react-router-dom')


const NoteSummary = ({
	id,
	name
}) =>
	<Card as={Link} to={`/note/${id}`}
		header={name}
	/>

module.exports = NoteSummary

const React = require('react')

const Notes = ({
	notes,
	append
}) => notes.length ?
	<div>
		<div>
			<button onClick={append}>+ Note</button>
		</div>

		{notes}
	</div>
	:
	<div>
		No notes...
		<button onClick={append}>+ Note</button>
	</div>

module.exports = Notes

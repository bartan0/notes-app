const React = require('react')
const Label = require('local/ui/label')

const Checklist = ({
	content,
	items,
	setContent,
	append
}) =>
	<div>
		<Label value={content} onChange={setContent}/>

		<div>
			{items}

			<div>
				<button onClick={append}>+</button>
			</div>
		</div>
	</div>

module.exports = Checklist

const React = require('react')
const Label = require('local/ui/label')

const ChecklistItem = ({
	done,
	content,
	toggle,
	setContent
}) =>
	<div>
		<label>
			<input type="checkbox" checked={done} onChange={toggle}/>
			<Label value={content} onChange={setContent}/>
		</label>
	</div>

module.exports = ChecklistItem

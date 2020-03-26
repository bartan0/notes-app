const React = require('react')
const {
	Checkbox,
	List
} = require('semantic-ui-react')

const ChecklistItem = ({
	done,
	content
}) =>
	<List.Item>
		<List.Content>
			<Checkbox checked={done} label={content}/>
		</List.Content>
	</List.Item>

module.exports = ChecklistItem

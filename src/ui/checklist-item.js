const React = require('react')
const {
	Checkbox,
	Input,
	List
} = require('semantic-ui-react')

const ChecklistItem = ({
	done,
	content,
	toggle,
	setContent
}) =>
	<List.Item>
		<List.Content>
			<Checkbox checked={done} onChange={toggle}/>
			<Input fluid
				value={content}
				onChange={({ target: t }) => setContent(t.value)}
			/>
		</List.Content>
	</List.Item>

module.exports = ChecklistItem

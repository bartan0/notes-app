const React = require('react')
const {
	Button,
	Input,
	List,
	Segment
} = require('semantic-ui-react')


const ChecklistView = ({
	content,
	items,
	setContent,
	addItem
}) =>
	<Segment>
		<Input fluid
			value={content}
			onChange={({ target: t }) => setContent(t.value)}
		/>

		<List>
			{items}

			<List.Item>
				<List.Content>
					<Button icon="add" onClick={addItem}/>
				</List.Content>
			</List.Item>
		</List>
	</Segment>

module.exports = ChecklistView

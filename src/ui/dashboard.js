const React = require('react')
const { NodeStatus, useGService } = require('local/gservice')
const { Link } = require('react-router-dom')
const EditableLabel = require('local/ui/editable-label')


const Dashboard = () => {
	const [ root ] = useGService()
	const [ notes, status ] = useGService('/', n => n.type === 'NOTE')

	/*
	const {
		NOTE: notes,
		SCHEMA: schemas
	} = nodes.reduce((acc, node) => {
		if (acc[node.type])
			acc[node.type].push(node)

		return acc
	}, {
		NOTE: [],
		SCHEMA: []
	})
	*/

	return status === NodeStatus.OK ?
		<div>
			<div>
				<button onClick={() => root.append('NOTE')}>+ Add Note</button>
			</div>

			{notes.map(note =>
				<div key={note.id}>
					<button onClick={() => note.remove()}>X</button>
					<EditableLabel value={note.name} onUpdate={name => note.setName(name)}/>
					<Link to={`/note/${note.id}`}>{'>>>'}</Link>
				</div>
			)}
		</div>
	:
		<div>
			Loading...
		</div>
}

module.exports = Dashboard

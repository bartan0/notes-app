const React = require('react')
const { Link } = require('react-router-dom')

const NotesList = ({
	notes,
	onAdd,
	onRemove
}) => notes.length ?
	<div>
		<div>
			<button onClick={onAdd}>+ Add Note</button>
		</div>

		{notes.map(note =>
			<div key={note.id}>
				<button onClick={() => onRemove(note)}>X</button>
				<Link to={`/note/${note.id}`}>
					{note.name}
				</Link>
			</div>
		)}
	</div>
:
	<div>
		No notes.

		<div>
			<button onClick={onAdd}>+ Add Note</button>
		</div>
	</div>

module.exports = NotesList

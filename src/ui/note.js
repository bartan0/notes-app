const React = require('react')
const { NodeType } = require('local/const')
const Label = require('local/ui/label')


const Note = ({
	name,
	components,
	setName,
	append
}) =>
	<div>
		<div>
			<Label value={name} onChange={setName}/>

			<div>
				<button onClick={() => append(NodeType.CHECKLIST)}>+ Checklist</button>
				<button onClick={() => append(NodeType.DOCUMENT)}>+ Document</button>
			</div>
		</div>

		<div>
			{components}
		</div>
	</div>

module.exports = Note

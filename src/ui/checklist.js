const React = require('react')

const ChecklistItem = ({
	done,
	content,
	toggle,
	setContent,
	remove
}) =>
	<div>
		<input type="checkbox" checked={done} onChange={toggle}/>
		<input type="text" value={content} onChange={({ target: t }) => setContent(t.value)}/>
		<button onClick={remove}>X</button>
	</div>


const Checklist = ({
	content,
	append,
	items,
	setContent,
	save
}) =>
	<div>
		<div><button onClick={save}>SAVE</button></div>
		<div><input type="text" value={content} onChange={({ target: t }) => setContent(t.value)}/></div>

		<div>
			{items(ChecklistItem)}
			<div><button onClick={append}>+</button></div>
		</div>
	</div>

module.exports = Checklist

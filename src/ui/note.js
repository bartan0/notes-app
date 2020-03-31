const React = require('react')
const ChecklistElement = require('local/ui/checklist-element')
const DocumentElement = require('local/ui/document-element')
const SteplistElement = require('local/ui/steplist-element')
const { Link } = require('react-router-dom')
const { useGService } = require('local/containers/gservice')


const NoteView = ({ nodePath }) => {
	const [
		elements,
		elementsStatus,
		note,
		noteStatus
	] = useGService(`${nodePath}/`)

	return note ?
		<div>
			<div>
				<Link to="/">{'<<<'}</Link>
				<input defaultValue={note.name} onBlur={({ target: t }) => note.setName(t.value)}/>
			</div>

			<div>
				<button onClick={() => note.addChecklist()}>+ Checklist</button>
				<button onClick={() => note.addDocument()}>+ Document</button>
				<button onClick={() => note.addSteplist()}>+ Steplist</button>
			</div>

			<div>
				{elements.length ?
					elements.map(elem => {
						const path = `${nodePath}/${elem.id}`
						const Component = {
							CHECKLIST: ChecklistElement,
							DOCUMENT: DocumentElement,
							STEPLIST: SteplistElement
						}
							[elem.type]

						return (
							<div key={elem.id}>
								<div>
									<button onClick={() => elem.remove()}>X</button>
								</div>

								<Component nodePath={path}/>
							</div>
						)
					})
				:
					<div>No elements</div>
				}
			</div>
		</div>
	:
		<div>
			<Link to="/">{'<<<'}</Link>
		</div>
}

module.exports = NoteView

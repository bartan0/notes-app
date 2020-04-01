const React = require('react')
const FocusContainer = require('local/containers/focus')
const DynamicLabel = require('local/ui/dynamic-label')
const ChecklistElement = require('local/ui/checklist-element')
const DocumentElement = require('local/ui/document-element')
const SteplistElement = require('local/ui/steplist-element')
const { Link } = require('react-router-dom')
const { useGService } = require('local/containers/gservice')

const { useState } = React

const typeToComponent = {
	CHECKLIST: ChecklistElement,
	DOCUMENT: DocumentElement,
	STEPLIST: SteplistElement
}


const NoteView = ({ nodePath }) => {
	const [
		elements,
		elementsStatus,
		note,
		noteStatus
	] = useGService(`${nodePath}/`)
	const [ activeId, setActiveId ] = useState(null)

	return note ?
		<div>
			<div>
				<Link to="/">{'<<<'}</Link>
				<DynamicLabel content={note.name} onUpdate={name => note.setName(name)}/>
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
						const Component = typeToComponent[elem.type]

						return (
							<FocusContainer key={elem.id}
								onFocus={() => setActiveId(elem.id)}
								onBlur={() => setActiveId(null)}
							>
								{elem.id === activeId &&
									<div>
										<button onClick={() => elem.remove()}>X</button>
									</div>
								}
								<Component nodePath={path} showToolbar={elem.id === activeId}/>
							</FocusContainer>
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

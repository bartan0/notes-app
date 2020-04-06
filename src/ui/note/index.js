require('./style.sass')

const React = require('react')
const FocusContainer = require('local/containers/focus')
const DynamicLabel = require('local/ui/dynamic-label')
const ButtonGroup = require('local/ui/button-group')
const ChecklistElement = require('local/ui/checklist-element')
const DocumentElement = require('local/ui/document-element')
const SteplistElement = require('local/ui/steplist-element')
const { Link } = require('react-router-dom')
const { useGService } = require('local/gservice')
const { bem } = require('local/lib')

const { useState } = React

const components = {
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

	return (
		<div className={bem('note')}>
			{note ?
				<div>
					<ButtonGroup vertical>
						<Link to="/">{'<<<'}</Link>
						<button onClick={() => note.addChecklist()}>+ Checklist</button>
						<button onClick={() => note.addDocument()}>+ Document</button>
						<button onClick={() => note.addSteplist()}>+ Steplist</button>
					</ButtonGroup>

					<div className={bem('note', 'name')}>
						<DynamicLabel content={note.name} onUpdate={name => note.setName(name)}/>
					</div>

					<div>
						{elements.length ?
							elements.map(elem => {
								const path = `${nodePath}/${elem.id}`
								const Component = components[elem.type]

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
				<Link to="/">{'<<<'}</Link>
			}
		</div>
	)
}

module.exports = NoteView

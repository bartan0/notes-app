require('./style.sass')
require('./transformers')

const React = require('react')
const FocusContainer = require('local/containers/focus')
const DynamicLabel = require('local/ui/dynamic-label')
const ButtonGroup = require('local/ui/button-group')
const ElementToolbar = require('local/ui/element-toolbar')
const { Link } = require('react-router-dom')
const { useGService } = require('local/gservice')
const { bem } = require('local/lib')

const { useState } = React

const NoteElement = {
	CHECKLIST: require('local/elements/checklist'),
	DOCUMENT: require('local/elements/document'),
	STEPLIST: require('local/elements/steplist')
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
					<ButtonGroup>
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
								const Element = NoteElement[elem.type]

								return (
									<FocusContainer key={elem.id}
										onFocus={() => setActiveId(elem.id)}
										onBlur={() => setActiveId(null)}
									>
										{elem.id === activeId &&
											<ElementToolbar
												actions={Element.actions}
												element={elem}
											/>
										}
										<Element.Component nodePath={path}/>
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

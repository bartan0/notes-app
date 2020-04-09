require('./style.sass')
require('./transformers')

const React = require('react')
const FocusContainer = require('local/ui/focus')
const ButtonGroup = require('local/ui/button-group')
const EditableLabel = require('local/ui/editable-label')
const Icon = require('local/ui/icon')
const { useHistory } = require('react-router-dom')
const { useGService } = require('local/gservice')
const { bem, userConfirm } = require('local/lib')

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
	const history = useHistory()
	const [ activeId, setActiveId ] = useState(null)

	return (
		<div className={bem('note')}>
			{note ?
				<div>
					<ButtonGroup actions={[
						{
							icon: 'chevron-left',
							title: 'Go Back',
							action: () => history.goBack()
						},
						{
							icon: 'tasks',
							title: 'Add Checklist',
							action: () => note.addChecklist()
						},
						{
							icon: 'file-alt',
							title: 'Add Document',
							action: () => note.addDocument()
						},
						{
							icon: 'list-ol',
							title: 'Add Steplist',
							action: () => note.addSteplist()
						},
						{
							icon: 'ban',
							title: 'Remove Note',
							action: () => userConfirm(
								'Do you really want to remove this note?',
								() => note.remove()
							)
						}
					]}/>

					<div className={bem('note', 'name')}>
						<EditableLabel value={note.name} onUpdate={name => note.setName(name)}/>
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
				<button onClick={() => history.goBack()}>Back</button>
			}
		</div>
	)
}

module.exports = NoteView

const React = require('react')
const EditableLabel = require('local/ui/editable-label')
const { useGService } = require('local/gservice')

const SteplistItem = require('./item')

require('./style.sass')

const C = 'steplist'


const Steplist = ({
	nodePath
}) => {
	const [
		steps,
		stepsStatus,
		steplist,
	] = useGService(`${nodePath}/`)

	const switchActiveStep = id =>
		steps.forEach(step => step.setActive(step.id === id && !step.active))

	return steplist ?
		<div className={C}>
			<EditableLabel
				value={steplist.name}
				actionsRight={[
					{
						icon: 'plus',
						title: 'Add Item',
						action: () => steplist.addStep()
					}, {
						icon: 'chevron-up',
						title: 'Move Up',
						action: () => steplist.reorder(-1)
					}, {
						icon: 'chevron-down',
						title: 'Move Down',
						action: () => steplist.reorder(1)
					}, {
						icon: 'ban',
						title: 'Remove Checklist',
						action: () => steplist.remove()
					}
				]}
				onUpdate={name => steplist.setName(name)}
			/>

			{steps.length ?
				<div className={C + '__steps'}>
					{steps.map(({ id }) =>
						<SteplistItem
							key={id}
							nodePath={`${nodePath}/${id}`}
							onSetActive={switchActiveStep}
						/>
					)}
				</div>
			:
				<div>No steps</div>
			}
		</div>
	:
		<div>Loading...</div>
}

module.exports = Steplist

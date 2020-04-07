const React = require('react')
const EditableLabel = require('local/ui/editable-label')
const { useGService } = require('local/gservice')

const SteplistItem = require('./item')


const Steplist = ({
	nodePath,
	showToolbar
}) => {
	const [
		steps,
		stepsStatus,
		steplist,
		steplistStatus
	] = useGService(`${nodePath}/`)

	const switchActiveStep = id =>
		steps.forEach(step => step.setActive(step.id === id && !step.active))

	return steplist ?
		<div>
			<div>
				{showToolbar &&
					<div>
						<button onClick={() => steplist.addStep()}>+ Step</button>
					</div>
				}

				<EditableLabel value={steplist.name} onUpdate={name => steplist.setName(name)}/>
			</div>

			{steps.length ?
				<ol>
					{steps.map(({ id }) =>
						<SteplistItem
							key={id}
							nodePath={`${nodePath}/${id}`}
							onSetActive={switchActiveStep}
						/>
					)}
				</ol>
			:
				<div>No steps</div>
			}
		</div>
	:
		<div>Loading...</div>
}

module.exports = Steplist

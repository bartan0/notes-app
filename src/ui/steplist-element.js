const React = require('react')
const { useGService } = require('local/containers/gservice')
const { exEvent } = require('local/lib')
const SteplistItem = require('local/ui/steplist-element-item')


const Steplist = ({ nodePath }) => {
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
				<button onClick={() => steplist.addStep()}>+ Step</button>
				<input defaultValue={steplist.name} onBlur={exEvent(steplist, 'setName')}/>
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

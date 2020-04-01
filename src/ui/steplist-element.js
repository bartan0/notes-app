const React = require('react')
const DynamicLabel = require('local/ui/dynamic-label')
const { useGService } = require('local/containers/gservice')
const SteplistItem = require('local/ui/steplist-element-item')


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

				<DynamicLabel content={steplist.name} onUpdate={name => steplist.setName(name)}/>
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

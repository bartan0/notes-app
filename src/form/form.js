const { createElement } = React

const fields = require('./fields')


const Form = ({
	model,
	schema,
	actions,
	onSubmit,
	onCancel
}) => {
	if (!actions)
		actions = []

	if (onCancel)
		actions.push({
			label: 'Cancel',
			type: 'reset'
		})

	if (onSubmit)
		actions.push({
			label: 'Submit',
			type: 'submit'
		})

	return (
		<form
			onReset={ev => {
				ev.preventDefault()
				onCancel()
			}}
			onSubmit={ev => {
				ev.preventDefault()
				onSubmit(Object.fromEntries([ ...ev.target.elements ]
					.filter(({ name }) => name)
					.map(({ name, type, value, checked }) => type === 'checkbox'
						? [ name, checked ]
						: [ name, value ]
					)
				))
			}}
		>
			{Object.entries(schema.schema()).map(([ name, schema ]) => {
				const [ component, props ] = fields[schema._control].call(schema,
					model[name],
					name
				)

				return (
					<div key={name}>
						<label>
							{schema._label}
							{createElement(component, {
								name,
								defaultValue: model[name],
								...props
							})}
						</label>
					</div>
				)
			})}

			{actions.map(({ type, label, action }, key) =>
				<div key={key}>
					<button
						type={type || 'button'}
						onClick={action}
					>
						{label}
					</button>
				</div>
			)}
		</form>
	)
}

module.exports = Form
